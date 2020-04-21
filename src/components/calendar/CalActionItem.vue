<template>
  <li class="actionitem">
    <div class="actionitem__container">
      <div class="actionitem__check">
        <b-check
          v-model="plantAction.completed"
          size="lg"
          title="Weirdo fsfsdf"
          @change="onChange"
        />
      </div>
      <div class="actionitem__text">
        <small>{{ plantAction.dateName }}</small>
        <h5>
          <strong>{{ plantAction.plant.displayName }}</strong>
          <br />
          <span>{{ plantAction.name }}</span>
        </h5>
      </div>
      <img :src="imgUrl" alt class="actionitem__img" />
    </div>
  </li>
</template>

<script>
export default {
  name: "CalActionItem",
  props: {
    plantAction: { type: Object, required: true }
  },
  data: function() {
    return {
      completed: this.plantAction.completed
    };
  },
  computed: {
    imgUrl: function() {
      return this.plantAction.plant.imgUrl || "https://picsum.photos/75/75";
    }
  },
  methods: {
    onChange: function() {
      this.$emit(
        this.plantAction.completed ? "uncompleted" : "completed",
        this.plantAction
      );
    }
  }
};
</script>

<style lang="scss">
.actionitem {
  padding: 10px;
  border-bottom: 1px solid #ddd;
}
.actionitem__container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.actionitem__img {
  width: 75px;
  height: 75px;
  border-radius: 38px;
}
.actionitem__text {
  flex-grow: 1.2;
  text-align: left;
  padding-left: 20px;
  small {
    color: #aaa;
  }
}
</style>
