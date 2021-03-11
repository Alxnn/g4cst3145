<template>
  <div class="home">
    <h1 class="title"> Classes & Activities </h1>
    <router-link class="cart-button button" :to="{ name: 'Cart', params: { cart, classes } }" tag="button">Cart</router-link>
    <div class="container">
      <div class="left_column">
        <h3>Sort By</h3>
        <div class="sort-menu">
          <div class="sort-menu-item">
            <input type="radio" id="Subject" name="sort_primary" value="title" v-model="sortPrimary" @change="filter()">
            <label for="Subject">Subject</label>
          </div>
          <div class="sort-menu-item">
            <input type="radio" id="Location" name="sort_primary" value="location" v-model="sortPrimary" @change="filter()">
            <label for="Location">Location</label>
          </div>
          <div class="sort-menu-item">
            <input type="radio" id="Price" name="sort_primary" value="price" v-model="sortPrimary" @change="filter()">
            <label for="Price">Price</label>
          </div>
          <div class="sort-menu-item">
            <input type="radio" id="Availability" name="sort_primary" value="availableInventory" v-model="sortPrimary" @change="filter()">
            <label for="Availability">Availability</label>
          </div>
        </div>
        <br><br><br>
        <div class="sort-menu">
          <div class="sort-menu-item">
            <input type="radio" id="Ascending" name="sort_secondary" value="asc" v-model="sortSecondary" @change="filter()">
            <label for="Ascending">Ascending</label>
          </div>
          <div class="sort-menu-item">
            <input type="radio" id="Descending" name="sort_secondary" value="desc" v-model="sortSecondary" @change="filter()">
            <label for="Descending">Descending</label>
          </div>
        </div>
      </div>
      <div class="right_column">
          <div class="class-list">
            <div v-for="(item, index) in classes" v-bind:key="item.id" class="class-item">
              <img :src="`${apiUrl}/images/${item.image}`" alt="Class image" class="class-image"/>
              <div class="class-info">{{item.id}} - <b>{{item.topic}}</b></div>
              <div class="class-info">{{item.location}}</div>
              <div class="class-info">Price: £{{item.price}}</div>
              <div class="class-info">Available: {{item.space}}</div>
              <button class="checkout-button" v-on:click="addToCart(item.id, index)" :disabled="item.availableInventory <= 0 || alreadyAdded(item.id)">Add To Cart</button>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
const API_URL = 'http://localhost:3000'

export default {
  name: 'Home',
  props: ['_cart'],
  data: function () {
    return {
      apiUrl: API_URL,
      classes: [],
      cart: {},
      sortPrimary: '',
      sortSecondary: ''
    }
  },
  methods: {
    addToCart: function (itemID, index) {
      if (this.alreadyAdded(itemID)) return;
      this.classes[index].availableInventory = this.classes[index].availableInventory-1;
      this.cart[itemID] = true;
    },
    alreadyAdded: function (itemID) {
      let added = this.cart[itemID];
      if (added === undefined) added = false
      return added
    },
    filter: function () {
      if (this.sortSecondary === "asc")this.sortByAsc(this.sortPrimary);
      if (this.sortSecondary === "desc")this.sortByDesc(this.sortPrimary);
    },
    sortByAsc: function (type) {
      this.classes.sort(function(a,b) {
        if(a[type] < b[type]) { return -1; }
        if(a[type] > b[type]) { return 1; }
        return 0;
      })
    },
    sortByDesc: function (type) {
      this.classes.sort(function(a,b) {
        if(a[type] > b[type]) { return -1; }
        if(a[type] < b[type]) { return 1; }
        return 0;
      })
    }
  },
  mounted() {
    console.log(this._cart);
    fetch(`${API_URL}/lesson/get/all`)
      .then(response => response.json())
      .then(data => {
        this.classes = data
      })

    if (this._cart !== undefined) {
      this.cart = this._cart
    }
  }
}
</script>

<style scoped>
@import '../../App.css';
</style>
