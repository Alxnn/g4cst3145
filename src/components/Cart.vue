<template>
  <div class="cart">
    <h1>Cart</h1>
    <router-link class="back-button button" :to="{ name: 'Home', params: { _cart: cart } }" tag="button">Back</router-link>
    <div class="cart-container" v-if="!empty">
      <div class="class-list">
        <div v-for="(item) in inCartClasses()" v-bind:key="item.id" class="class-item">
          <img :src="item.image" alt="Class image" class="class-image"/>
          <div class="class-info">{{item.id}} - <b>{{item.title}}</b></div>
          <button class="checkout-button" v-on:click="removeFromCart(item.id)" :disabled="item.availableInventory <= 0">Remove From Cart</button>
        </div>
      </div>
      <div class="item">
          <label for="name">Name:</label>
          <input type="text" id="name" name="name">
      </div>
      <div class="item">
        <label for="phone">Phone:</label>
        <input type="number" id="phone" name="phone">
      </div>
      <button v-on:click="checkout()" class="checkout-button">Checkout</button>
    </div>
    <div v-if="empty"><h3>Cart is empty</h3></div>
  </div>
</template>

<script>
export default {
  name: 'Cart',
  props: ['cart', 'classes'],
  data: function () {
    return {
      empty: false
    }
  },
  methods: {
    removeFromCart: function (id) {
      delete this.cart[id]
      this.classes[this.getClassIndexByID(id)].availableInventory += 1
      if (Object.keys(this.cart).length === 0) this.empty = true;
      this.$forceUpdate();
    },
    inCartClasses: function() {
      if (this.cart == undefined) return [];
      let classes = []
      for (let i = 0; i < this.classes.length; i++) {
        const item = this.classes[i]
        if (this.cart[item.id])classes.push(item)
      }
      return classes
    },
    getClassIndexByID: function(id) {
      for (let i = 0; i < this.classes.length; i++) {
        if (this.classes[i].id === id) return i
      }
    },
    checkout: function() {
      console.log("CHECKING OUT WITH CART:");
      console.log(this.cart)
    }
  },
  mounted(){
    if (this.classes === undefined) {
      this.$router.push('/') 
    }
    if (this.cart === undefined || Object.keys(this.cart).length === 0) {
      console.log('EMPTY');
      this.empty = true;
    }
  }
}
</script>
