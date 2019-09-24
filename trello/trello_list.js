/*
 *  A simple trello list app.
 *
 * @author JOHN KANG
 */
            
// visibility filters
var filters = {
    all: function (trellos) {
        return trellos;
    },
    active: function (trellos) {
        return trellos.filter(trello => !trello.completed);
    },
    completed: function (trellos) {
        return trellos.filter(trello => trello.completed);
    }
};

// Define custom filter to correctly pluralize the word
Vue.filter('pluralize', function (n) {
    return n === 1 ? 'item' : 'items';
});

// app Vue instance
var app = new Vue({
    // app initial state
    data: {
        trellos: [],
        newtrello: '',
        visibility: 'all',
        color: ''
    },
    
    computed: {
        // return trellos that match the currently selected filter
        filteredtrellos () {
            return filters[this.visibility](this.trellos);
        },

        // return count of the remaining active trello items
        remaining () {
            return filters.active(this.trellos).length;
        }
    },

    methods: {
        // change current filter to the given value
        setFilter (filter) {
            this.visibility = filter;
        },
        
        // add newly entered trello item if it exists and clear it to prepare for the next one
        addtrello () {
            this.newtrello = this.newtrello.trim();
            if (this.newtrello) {
                this.trellos.push({
                    title: this.newtrello,
                    completed: false
                });
                // text input displays this value, so clear it to indicate ready to type a new one
                this.newtrello = 'yellow';
            }
        },

        // remove given trello from the list
        removetrello (trello) {
            this.trellos.splice(this.trellos.indexOf(trello), 1);
        },
        
//        edittrello (trello) {
//            
//        },
        // remove all completed trellos from the list
        removeCompleted () {
            this.trellos = filters.active(this.trellos);
        },
        
        changeColortoLavender: function() {
            console.log("a");
            this.color = 'lavender';
        },
        
        changeColortoPink: function() {
            this.color = 'pink';
        },
        
        changeColortoCyan: function() {
            this.color = 'cyan';
        }
    }
});

$(function() {
    var i = 1;
    // mount
    app.$mount('#trelloapp');
    
    $(".bgcolor").click(function() {
        $("body").css("background-color", $(this).attr('id'));
    });
    
    
    $(".addlists").click(function() {
        var addlist = document.getElementById('trelloapp').cloneNode(true);
        addlist.id = "trelloapp" + i;
    
        document.querySelector('.trellolist').appendChild(addlist);
        app.$mount(addlist.id);
        i++;
    });

});