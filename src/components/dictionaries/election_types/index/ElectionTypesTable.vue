<template>
  <div class="table-responsive vh-100 p-o m-0">
    <table class="table table-striped">
      <caption>List of election types</caption>
      <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Description</th>
        <th>Country</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(electionType, index) in electionTypes" :key="electionType.id">
        <th>{{ index + 1 }}</th>
        <td>{{ electionType.name }}</td>
        <td>{{ electionType.description }}</td>
        <td>{{ electionType.country.name }}</td>
        <td>
          <ThreeDotsDropdown>
            <li><a class="dropdown-item" v-on:click="$emit('view', electionType)">View</a></li>
            <li><a class="dropdown-item" v-on:click="$emit('modify', electionType)">Modify</a></li>
          </ThreeDotsDropdown>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import ThreeDotsDropdown from "@/components/partials/ThreeDotsDropdown.vue";
import {findAll} from "@/services/electionTypesService";

export default {
  name: "ElectionTypesTable",
  components: {
    ThreeDotsDropdown
  },
  emits: [
    'view',
    'modify'
  ],
  methods: {
    getAllElectionTypes() {
      findAll().then(result => {
        this.electionTypes = result.data;
      }).catch(() => {
        this.error = "Something went wrong while retrieving election types, please try again later or contact support.";
      }).finally(() => {
        this.electionTypesLoading = false;
        this.error = undefined;
      });
    },
  },
  data() {
    return {
      electionTypesLoading: true,
      electionTypes: [],
      error: "",
    };
  },
  mounted() {
    this.getAllElectionTypes();
  }
}
</script>

<style scoped>

</style>