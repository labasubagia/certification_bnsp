<script>
import { ref } from 'vue';
import EmployeeRemote from './api/employee';
const employeeRemote = new EmployeeRemote()

export default {
  setup() {
    const employees = ref([])

    const defaultForm = { _id:'', employee_id:'',name:'', address:'', phone:'' }
    const form = ref({...defaultForm})
    const isFormOpen = ref(false)

    const loadData = async () => {
      try {
        employees.value = await employeeRemote.getAll()
      } catch (error) {
        console.error(error.message)
      }
    }

    const handleDelete = async (employee) => {
      try {
        const isConfirmed = confirm(`Delete this employee ${employee.name}`)
        if (!isConfirmed) return
        const data = await employeeRemote.delete(employee._id)
        if(!data) throw new Error(`Failed delete employee ${employee.name}`)
        await loadData()
      } catch (error) {
        alert(error.message)
        console.error(error.message)
      }
    }

    const openForm = (val=defaultForm) => {
      isFormOpen.value = true
      form.value = val
    }

    const closeForm = () => {
      isFormOpen.value = false
      form.value = {...defaultForm}
    }

    const handleFormSubmit = async () => {
      try {
        const state = form.value._id ? 'update' : 'create'
        const data = await employeeRemote[state](form.value)
        if(!data) throw new Error(`Failed ${state} employee ${form.value.name}`)
        await loadData()
        closeForm()
      } catch (error) {
        alert(error.message)
        console.error(error.message)
      }
    }

    loadData()

    return {
      employees,
      form,
      defaultForm,
      isFormOpen,
      handleDelete,
      openForm,
      closeForm,
      handleFormSubmit
    }
  }
}
</script>

<template>
  <!-- Header -->
  <div class="bg-blue-400 mb-8">
    <div class="container mx-auto">
      <p class="text-xl p-4 text-white">
        Employee Data
      </p>
    </div>
  </div>

  <div class="container mx-auto">

    <!-- Top -->
    <div class="flex justify-between items-center mb-6">
      <div class="text-xl">Employee List</div>
      <div class="just">
        <button
          v-if="!isFormOpen"
          type="button"
          class="bg-green-500 px-3 py-2 rounded text-white"
          @click="openForm"
        >
          Add Employee
        </button>
      </div>
    </div>

    <!-- Form -->
    <form @submit.prevent="handleFormSubmit" class="mb-6 border rounded p-4" v-if="isFormOpen">
      <p class="text-lg mb-2 font-bold">{{form._id ? 'Edit' : 'Add'}} Form</p>
      <div class="mb-2">
        <input
          type="text"
          class="px-2 py-1 border rounded w-full"
          placeholder="NIP (ID)"
          required
          v-model="form.employee_id"
        >
      </div>
      <div class="mb-2">
        <input
          type="text"
          class="px-2 py-1 border rounded w-full"
          placeholder="Name"
          required
          v-model="form.name"
        >
      </div>
      <div class="mb-2">
        <input
          type="text"
          class="px-2 py-1 border rounded w-full"
          placeholder="Address"
          required
          v-model="form.address"
        >
      </div>
      <div class="mb-4">
        <input
          type="text"
          class="px-2 py-1 border rounded w-full"
          placeholder="Phone"
          required
          v-model="form.phone"
        >
      </div>
      <div class="flex">
        <button type="button" class="px-2 py-1 bg-red-500 rounded text-white mr-2" @click="closeForm">
          Cancel
        </button>
        <button class="px-2 py-1 bg-green-400 text-white rounded">
          Save
        </button>
      </div>
    </form>

    <!-- Table -->
    <table class="table-auto w-full">
      <thead>
        <tr>
          <th>No</th>
          <th>NIP (ID)</th>
          <th>Name</th>
          <th>Address</th>
          <th>Phone</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(employee, i) in employees" :key="employee._id">
          <td>{{i+1}}</td>
          <td>{{employee.employee_id}}</td>
          <td>{{employee.name}}</td>
          <td>{{employee.address}}</td>
          <td>{{employee.phone}}</td>
          <td>
            <button class="px-2 py-1 bg-orange-400 text-sm rounded mr-2" @click="openForm({...employee})">
              Edit
            </button>
            <button class="px-2 py-1 bg-red-500 text-white text-sm rounded" @click="handleDelete(employee)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>


</template>

<style>
th {
  @apply text-left
}
th, td {
  @apply border-2 p-2
}
</style>
