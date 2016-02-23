
var TodoList = React.createClass({
    getInitialState: function(){
        return {tasks: [], sort:'all'};
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
        this.setState({type: type});
    },
    handleHoverToEdit: function(task){
        console.log(task);
        this.setState({tasks: this.state.tasks.map(function(task_){
            if( task_._id == task._id ){
                task_.text = task.text;
            }
            return task_;
        })});

        $.post('/api/editTasks', {_id:task._id, text:task.text})
            .done(function(data,status){
                this.loadTasksFromServer();
            }.bind(this))
            .error(function(data, status){
                console.error(data);
            });
    },
    render: function(){
        return (
<div className='todoList'>
    <Title />
    <Input submitTask={this.handleSubmit}/>
    <br/>
    <FilterButton type='all' action={this.filterList}/>
    <FilterButton type='todo' action={this.filterList}/>
    <FilterButton type='completed' action={this.filterList}/>
    <List tasks={this.state.tasks.filter(function(task){
            switch(this.state.type){
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

    }.bind(this))}
        removeTask={this.handleRemove}
        completeTask={this.handleComplete}
        handleHoverToEdit={this.handleHoverToEdit}
        />
</div> 
               );
    }
    //<Filter filterList={this.filterList}/>
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

var FilterButton = React.createClass({
    onClick: function(){
        console.log(this.props.type);
        this.props.action(this.props.type);
    },
    render: function(){
        return (
        <input type='button' onClick={this.onClick} value={this.props.type}/>
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
      edit={elem.edit}
      handleHoverToEdit={this.props.handleHoverToEdit}
      /> 
    );}.bind(this))}
</div>
               );
    }
});

var Task = React.createClass({
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
    <TaskText text={this.props.text} 
             _id={this.props._id} 
             edit={this.props.edit}
             handleHoverToEdit={this.props.handleHoverToEdit}
    />
    <Remove removeTask={this.handleRemove}/>
</div>
               );
    }
});

var TaskText = React.createClass({
    getInitialState: function(){
        return {edit: false, text: this.props.text};
    },
    onChange: function(text){
        this.setState({text: text.target.value});
    },
    handleFocus: function(){
        this.setState({edit:true});
    },
    sendUpdate: function(){
        this.props.handleHoverToEdit({_id: this.props._id, text: this.state.text});
        this.setState({text: '', edit: false});
    },
    handleKey: function(key){
        if( key.charCode == 13 || key.keyCode == 13 ){
            key.preventDefault();
            var text = this.state.text;
            if( !text ){
                return;
            }

            this.sendUpdate();
        }
    },
    handleBlur: function(){
        this.sendUpdate();
    },
    render: function(){
        if( this.state.edit ){
            return (
                    <input type='text' 
                        placeholder={this.props.text} 
                        value={this.state.text}
                        onChange={this.onChange}
                        onKeyPress={this.handleKey}
                        onBlur={this.handleBlur}
                    />
            );
        }
        return (
                <p onClick={this.handleFocus}> {this.props.text} </p>
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
