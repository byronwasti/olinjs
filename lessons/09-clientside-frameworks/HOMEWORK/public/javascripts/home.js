
var TodoList = React.createClass({
    getInitialState: function(){
        return {tasks: []};
    },
    loadTasksFromServer: function(){
        $.get( this.props.url ).
            done(function(data, status){
                this.setState({tasks:data});
            }.bind(this)).
            error(function(data, status){
                console.error(data);
            });
    },
    componentDidMount: function(){
        this.loadTasksFromServer();
    },
    handleSubmit: function(newTask){
        // Optomistic update
        var oldTaskList = this.state.tasks;
        newTask._id = Date.now();
        var optomistic_tasks = [newTask].concat(this.state.tasks);
        this.setState({tasks: optomistic_tasks});


        $.post('/api/tasks', newTask)
            .done(function(data, status){
                /* Returns just a single data point... */
                //this.setState({data:data});
                console.log('successful save!');
                this.setState({tasks: [data].concat(oldTaskList)});
            }.bind(this))
            .error(function(data, status){
                this.setState({tasks: oldTaskList});
                console.error(data);
            });
    },
    handleRemove: function(task_id){
        this.setState({tasks: this.state.tasks.filter(function(task){
            return task._id !== task_id
        })});
        $.post('/api/removeTasks', {_id:task_id} )
            .done(function(data, status){
            })
            .error(function(data, status){
                console.error(data);
            });
    },
    handleComplete: function(task_id){
        this.setState({tasks: this.state.tasks.map(function(task){
            if( task._id == task_id ){
                task.completed = true;
            }
            return task;
        })});

        $.post('/api/completeTasks', {_id:task_id} )
            .done(function(data, status){
            })
            .error(function(data, status){
                console.error(data);
            });
    },
    filterList: function(type){
        // Take no chances!
        this.loadTasksFromServer();
        console.log(type);

        this.setState({tasks: this.state.tasks.map(function(task){
            switch(type){
                case 'all':
                    return task;
                    break;
                case 'todo':
                    if( !task.completed )
                        return task;
                    break;
                case 'completed':
                    if( task.completed )
                        return task;
                    break;
                default:
                    return task;
            }
        })});
    },
    render: function(){
        return (
<div className='todoList'>
    <Title />
    <Input submitTask={this.handleSubmit}/>
    <Filter filterList={this.filterList}/>
    <List tasks={this.state.tasks}
        removeTask={this.handleRemove}
        completeTask={this.handleComplete}
        />
</div> 
               );
    }
});

var Title = React.createClass({
    render: function(){
        return (
                <h1>Todo List</h1>
               );
    }
});

var Input = React.createClass({
    getInitialState: function(){
        return {text:''};
    },
    handleTextChange: function(text){
        this.setState({text: text.target.value});
    },
    handleKey: function(key){
        if( key.charCode == 13 || key.keyCode == 13 ){
            key.preventDefault();
            var text = this.state.text;
            if( !text ){
                return;
            }
        
            this.props.submitTask({text: text});
            this.setState({text: ''});

        }
    },
    render: function(){
        return (
<input className='new_task'
    type='text'
    placeholder='I need to do...'
    value = {this.state.text}
    onChange = {this.handleTextChange}
    onKeyPress = {this.handleKey}
/>
               );

    }
});

var Filter = React.createClass({
    filterList: function(type){
        console.log(type.target);
        if(String(type.target).search('todo')){
            return this.props.filterList('todo');
        }
        if(String(type.target).search('all')){
            return this.props.filterList('all');
        }
        if(String(type.target).search('completed')){
            return this.props.filterList('completed');
        }
    },
    render: function(){
        return (
<div className='filterList'>

<p onClick={this.filterList} value={'all'}>All</p>
<p onClick={this.filterList} value={'todo'}>Todo</p>
<p onClick={this.filterList} value={'completed'}>Completed</p>

</div>
               );
    }
});

var List = React.createClass({
    render: function(){
        return (
<div className='taskList'>
    { this.props.tasks.map(function(elem){return ( 
<Task text={elem.text} 
      key={elem._id}
      removeTask={this.props.removeTask}
      completeTask={this.props.completeTask}
      _id={elem._id}
      isComplete={elem.completed}
      /> 
    );}.bind(this))}
</div>
               );
    }
});

var Task = React.createClass({
    handleFocus: function(){
        //console.log(this.props.text);
    },
    handleRemove: function(){
        this.props.removeTask(this.props._id);
    },
    completeTask: function(){
        this.props.completeTask(this.props._id);
    },
    render: function(){
        return (
<div className='taskElement' onClick={this.handleFocus}>
    <Complete completeTask={this.completeTask} checked={this.props.isComplete}/> 
    {this.props.text} 
    <Remove removeTask={this.handleRemove}/>
</div>
               );
    }
});

var Complete = React.createClass({
    handleChange: function(){
        this.props.completeTask();
    },
    render: function(){
        if( this.props.checked ){
            return (
    <input type='checkbox' disabled defaultChecked={this.props.checked} onChange={this.handleChange}/>
                   );
        } else {
            return (
    <input type='checkbox' defaultChecked={this.props.checked} onChange={this.handleChange}/>
                   );
        }
    }
});

var Remove = React.createClass({
    handleClick: function(a){
        a.preventDefault();
        this.props.removeTask();
    },
    render: function(){
        return (
<a href='/' onClick={this.handleClick} >Remove</a>
               );
    }
});

ReactDOM.render(
    <TodoList url='/api/tasks' />,
    document.getElementById('content')
);
