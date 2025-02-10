<template>
  <div class="table-responsive vh-100 p-o m-0">
    <table class="table table-striped">
      <caption>List of countries</caption>
      <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Total voters</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(country, index) in countries" :key="country.id">
        <th>{{ index + 1 }}</th>
        <td>{{ country.name }}</td>
        <td>{{ country.total_voters.toLocaleString() }}</td>
        <td>
          <ThreeDotsDropdown>
            <li><a class="dropdown-item" v-on:click="$emit('view', country)">View</a></li>
            <li><a class="dropdown-item" v-on:click="$emit('modify', country)">Modify</a></li>
          </ThreeDotsDropdown>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import ThreeDotsDropdown from "@/components/partials/ThreeDotsDropdown.vue";
import {findAll} from "@/services/countryService";

export default {
  name: "CountriesTable",
  components: {ThreeDotsDropdown},
  emits: [
    'view',
    'modify'
  ],
  methods: {
    getAllCountries() {
      findAll().then(result => {
        this.countries = result.data;
      }).catch(() => {
        this.error = "Something went wrong while retrieving countries, please try again later or contact support.";
      }).finally(() => {
        this.countriesLoading = false;
        this.error = undefined;
      });
    },
  },
  data() {
    return {
      countriesLoading: true,
      countries: [],
      error: "",
    };
  },
  mounted() {
    this.getAllCountries();
  }
}
</script>

<style scoped>

</style>