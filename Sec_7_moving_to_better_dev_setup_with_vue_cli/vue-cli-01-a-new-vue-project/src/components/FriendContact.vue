<template>
    <li>
        <h2>{{ name }} {{ isFavorite ? '(Favorite) ': ''}}</h2>
        <button @click="toggleIsFavorite"> Toggle favorite</button>
        <button @click="toggleDetails"> {{ detailsAreVisible ? 'Hide ': 'Show '}} details</button>
        <ul v-if="detailsAreVisible">
            <li> <strong>Phone:</strong> {{  phoneNumber }}</li>
            <li> <strong>Email:</strong> {{  emailAddress }}</li>
        </ul>
        <button @click="$emit('delete', id)">Delete</button>
    </li>
</template>

<!-- 
* Vue's data flow is unidirectional. Parent(App) -> Child (Component)
* props values are immutable.
* to change the values of the component either change in the App (parent) level, from where the data came in or 
  create a new data variable locally and modify it.
</template>

<script>
export default {

}
</script>

<style>

</style>
-->
<script>
export default {
    //props:['name', 'phoneNumber', 'emailAddress', 'isFavorite'],
    props:{
        id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
            required: true
        },
        emailAddress: {
            type: String,
            required: true
        },
        isFavorite: {
            type: Boolean,
            required: false,
            default: false,
            // validator: function(value){
            //     return value === '0' || value === '1';
            // }
        }
    },
    emits: ['toogle-favorite', 'delete'],
    // emits: {
    //     'toogle-favorite': function(id){
        // Validating the cusstom emit
    //         if(id){
    //             return true;
    //         }else{
    //             console.warn('ID is missing');
    //             return false;
    //         }
    //     }
    // },
    data(){
        return {
            detailsAreVisible: false,
            //friendIsFavorite: this.isFavorite,
        };
    },
    methods:{
        toggleDetails(){
            this.detailsAreVisible = !this.detailsAreVisible;
        },
        toggleIsFavorite(){
            // if(this.friendIsFavorite === "1"){
            //     this.friendIsFavorite = "0";
            // }else{
            //     this.friendIsFavorite = "1";
            // }
            
            //this.friendIsFavorite = !this.friendIsFavorite;
            this.$emit('toogle-favorite', this.id);
        }
    }
};
</script>