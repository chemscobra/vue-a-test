<template>
  <v-dialog :value="dialog" width="550" persistent>
    <v-form ref="form" v-model="isValidForm" @submit.prevent="saveData">
      <v-card>
        <v-card-title class="text-h5 blue lighten-2">
          {{ formTitle }}
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row align="center" class="p-4">
              <v-col cols="12">
                <v-text-field
                  v-model="item.name"
                  :counter="maxNameChars"
                  :rules="nameRules"
                  label="Name *"
                  outlined
                  dense
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="item.quantity"
                  @keypress="onlyNumber"
                  :rules="quantityRules"
                  label="Quantity *"
                  outlined
                  dense
                  required
                  type="number"
                  min="0"
                >
                </v-text-field>
              </v-col>
              <v-col cols="6">
                <v-select
                  :items="categories"
                  :rules="categoryRules"
                  v-model="item.categoryId"
                  label="Category *"
                  dense
                  outlined
                >
                  <template #item="{ item }">
                    <v-list-item-avatar size="32" tile>
                      <img
                        :src="
                          require(`@/assets/category_icons/${item.iconName}.png`)
                        "
                        contain
                      />
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title> {{ item.text }} </v-list-item-title>
                    </v-list-item-content>
                  </template>
                  <template #selection="{ item }">
                    <v-list-item-avatar size="24" tile>
                      <img
                        :src="
                          require(`@/assets/category_icons/${item.iconName}.png`)
                        "
                        contain
                      />
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title> {{ item.text }} </v-list-item-title>
                    </v-list-item-content>
                  </template>
                </v-select>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  outlined
                  label="Description"
                  v-model="item.description"
                  :rules="descriptionRules"
                ></v-textarea>
              </v-col>

              <v-col cols="6">
                <v-text-field
                  v-model="item.priceTaxExcluded"
                  @keypress="onlyNumber"
                  :rules="priceRules"
                  label="Price (Tax Excluded) *"
                  outlined
                  dense
                  required
                  type="text"
                >
                </v-text-field>
              </v-col>
              <v-col cols="6">
                <v-switch
                  v-model="item.status"
                  :true-value="'1'"
                  :false-value="'0'"
                  :label="`Status: ${
                    item.status === '1' ? 'Active' : 'Inactive'
                  }`"
                  color="light-green darken-1"
                  class="mb-6"
                  inset
                ></v-switch>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="primary" text @click="closeDialog" :disabled="loading">
            Cancel
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            type="submit"
            color="success"
            :disabled="!isValidForm || loading"
            :loading="loading"
          >
            {{ submitButtonText }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
export default {
  model: {
    prop: 'dialog',
    event: 'close'
  },
  props: {
    dialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false,
      error: null,
      item: {
        name: '',
        description: '',
        quantity: '',
        categoryId: '',
        priceTaxExcluded: 0,
        status: '0'
      },
      defaultItem: {
        name: '',
        description: '',
        quantity: '',
        categoryId: '',
        priceTaxExcluded: 0,
        status: '0'
      },
      maxNameChars: 200,
      maxDescriptionChars: 512,
      nameRules: [
        (v) => !!v || 'Name is Required',
        (v) =>
          (v && v.length <= this.maxNameChars) ||
          `Name must be ${this.maxNameChars} characters max`
      ],
      descriptionRules: [
        (v) =>
          (v || '').length <= this.maxDescriptionChars ||
          `Description must be ${this.maxDescriptionChars} characters max`
      ],
      categoryRules: [(v) => !!v || 'Category is required'],
      quantityRules: [(v) => !!v || 'Quantity is required'],
      priceRules: [(v) => !!v || 'Price Tax Excluded is required'],
      isValidForm: false
    };
  },
  watch: {
    dialog(newValue) {
      if (newValue) {
        this.$nextTick(() => {
          this.item = { ...this.$store.state.toEditItem };
          this.$refs.form.resetValidation();
        });
      }
    }
  },
  computed: {
    categories() {
      return this.$store.getters.getCategoryListForVSelect;
    },
    formTitle() {
      return this.$store.state.editedItemIndex === -1
        ? 'New Item'
        : 'Edit Item';
    },
    submitButtonText() {
      return this.$store.state.editedItemIndex === -1 ? 'Save' : 'Update';
    }
  },
  methods: {
    resetFormData() {
      this.item = Object.assign({}, this.defaultItem);
      this.$store.commit('setToEditItem', this.defaultItem);
      this.$store.commit('setEditedItemIndex', -1);
      this.resetFormValidation();
    },
    resetFormValidation() {
      const itemFormRef = this.$refs.form;
      itemFormRef.reset();
      itemFormRef.resetValidation();
    },
    closeDialog() {
      this.resetFormData();
      this.$emit('close', false);
    },
    onlyNumber(evt) {
      const charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode === 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    async saveData() {
      const actionName =
        this.$store.state.editedItemIndex === -1 ? 'createItem' : 'updateItem';

      try {
        this.loading = true;
        await this.$store.dispatch(actionName, this.item);
        this.closeDialog();
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>
