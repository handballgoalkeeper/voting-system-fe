<template>
  <div class="table-responsive vh-100 p-o m-0">
    <table class="table table-striped">
      <caption>List of elections</caption>
      <thead>
      <tr>
        <th>#</th>
        <th>Country</th>
        <th>Election type</th>
        <th>Starts at</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(election, index) in elections" :key="election.id">
        <th>{{ index + 1 }}</th>
        <td>{{ election.country.name }}</td>
        <td>{{ election.electionType.name }}</td>
        <td>{{ election.starts_at }}</td>
        <td>
          <ThreeDotsDropdown :class="{
            'd-none': !election.is_published
          }">
            <li><a class="dropdown-item" v-on:click="$emit('view', election)">View</a></li>
            <li><a class="dropdown-item" v-on:click="$emit('modify', election)">Modify</a></li>
          </ThreeDotsDropdown>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import ThreeDotsDropdown from "@/components/partials/ThreeDotsDropdown.vue";
import {findAll} from "@/services/electionService";
import {utcToLocalDateTime} from "@/utils/helper";

export default {
  name: "ElectionsTable",
  components: {ThreeDotsDropdown},
  emits: [
    'view',
    'modify'
  ],
  methods: {
    getAllElections() {
      findAll().then(result => {
        this.elections = result.data.map(election => {
          election.starts_at = utcToLocalDateTime(election.starts_at);
          return election;
        });
        this.elections = result.data;
      }).catch(() => {
        this.error = "Something went wrong while retrieving elections, please try again later or contact support.";
      }).finally(() => {
        this.electionsLoading = false;
        this.error = undefined;
      });
    },
  },
  data() {
    return {
      electionsLoading: true,
      elections: [],
      error: "",
    };
  },
  mounted() {
    this.getAllElections();
  }
}
</script>

<style scoped>

</style>