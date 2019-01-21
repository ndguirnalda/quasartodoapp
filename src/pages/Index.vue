<template>
  <q-page padding>
    <q-modal v-model="opened" minimized>
      <div class="layout-padding">
        <q-input v-model="title" stack-label="Input your Title" />
        <br>
        <q-select
          v-model="completed"
          float-label="Is it completed?"
          :options="completedOptions"
        />
        <br>
        <center>
          <q-btn
            color="pink"
            @click="editTodo"
            label="Update"
            icon="update"
          />
        </center>
      </div>
    </q-modal>

    <!-- <h1 class="hello">Hello {{title}}</h1> -->
    <q-input v-model="title" stack-label="Input your Title" />
    <br>
    <q-select
      v-model="completed"
      float-label="Is it completed?"
      :options="completedOptions"
    />
    <br>
    <q-btn @click="addTodo" class="full-width" color="pink" icon="add" label="Add Todo" />
    <!-- <input v-model.number="num"> -->
    <!-- <pre>{{todos}}</pre> -->
    <!-- <ul v-for="(todo, index) in todos" :key="index">
      <li>{{index + 1}}</li>
      <li>{{todo.title}}</li>
      <li>{{todo.completed}}</li>
    </ul> -->
    <br><br>
    <q-list separator striped-odd sparse highlight>
      <q-list-header>Todo List</q-list-header>

      <!-- <q-item v-if="!todos.filter(t => (t.completed === todoShow)).length">
        <q-item-main class="text-center text-weight-bold">
          No todo list found
        </q-item-main>
      </q-item> -->
      <!-- v-show="todo.completed === todoShow" -->
      <q-item :class="'bg-'+(todo.completed ? 'green-3': 'red-3')" v-for="(todo, index) in todos" :key="index">
        <q-item-side>
          <!-- {{todo.completed ? 'Finish' : 'Not yet'}} -->
          <q-item-tile avatar>
            <img :src="'https://robohash.org/' + todo['.key']">
          </q-item-tile>
        </q-item-side>
        <q-item-main :sublabel="'Completed: ' + todo.completed" :label="todo.title" />
        <q-item-side @click.native="deleteTodo(todo)" right>
          <q-item-tile icon="delete" color="negative" />
        </q-item-side>

        <q-item-side @click.native="viewTodo(todo)" right>
          <q-item-tile icon="edit" color="secondary" />
        </q-item-side>
      </q-item>
    </q-list>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn size="lg" round color="pink" @click="todoShow =! todoShow" :icon="todoShow ? 'sentiment_very_satisfied' : 'sentiment_very_dissatisfied'" />
    </q-page-sticky>

    <!-- <h1>{{num + num1}}</h1> -->
    <!-- <h1>{{num - num1}}</h1>
    <h1>{{addition}}</h1>
    <h1>{{subtraction}}</h1> -->
  </q-page>
</template>

<style>
  .hello {
    color: pink;
  }
</style>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      todoShow: true,
      opened: false,
      todos: [],
      todoID: '',
      title: '',
      num: 5,
      num1: 2,
      completed: false,
      completedOptions: [
        {
          label: 'Yes',
          value: true
        },
        {
          label: 'No',
          value: false
        }
      ]
    }
  },
  mounted () {
    this.$binding('todos', this.$db.firestore().collection('todos').orderBy('title', 'asc').limit(3))
  },
  methods: {
    viewTodo (todo) {
      this.opened = true
      this.todoID = todo['.key']
      this.title = todo.title
      this.completed = todo.completed
    },
    addTodo () {
      // this.todos.push({
      //   title: this.title,
      //   completed: false
      // })
      this.$db.firestore().collection('todos').add({
        title: this.title,
        completed: this.completed
      })

      this.title = ''
      this.$q.notify({
        type: 'positive',
        message: 'You have successfully Added'
      })
    },
    deleteTodo (todo) {
      // this.todos.splice(index, 1)
      this.$q.dialog({
        title: 'Delete',
        message: 'Are you sure you want to Delete?',
        ok: {
          push: true,
          label: 'Yes'
        },
        cancel: {
          push: true,
          color: 'negative',
          label: 'No'
        }
      }).then(() => {
        this.$db.firestore().collection('todos').doc(todo['.key']).delete()
        this.$q.notify({
          type: 'negative',
          message: 'You have successfully Deleted!'
        })
      }).catch(() => {
      })
    },
    editTodo () {
      // this.todos[index] = {
      //   title: this.title,
      //   completed: !this.todos[index].completed
      // }
      // todo['.key']
      this.$db.firestore().collection('todos').doc(this.todoID).update({
        title: this.title,
        completed: this.completed
      })

      this.opened = false

      // this.$forceUpdate()
      this.$q.notify({
        type: 'positive',
        message: 'You have successfully Edited!'
      })
    }
  },
  computed: {
    addition () {
      return this.num + this.num1
    },
    subtraction () {
      return this.num - this.num1
    }
  }
}
</script>
