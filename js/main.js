var Task = React.createClass({
    getInitialState: function() {
        return {
            checked: false,
            value: this.props.children || '',            
            editing: false
        }
    },
    handleCheck: function() {
        this.setState({checked: !this.state.checked});
    },
    handleChange: function(event) {
        this.setState({value: event.target.value});
    },
    back: function() {        
        this.setState({editing: false});
    },
    edit: function() {
        console.log("Editar tarefa");
        // habilita o modo de edição
        this.setState({editing: true});
    },
    save: function() {
        // salvar dados do input no state
        var val = this.refs.taskInput.getDOMNode().value;
        this.props.children = val;

        // atualiza as informações no board
        this.props.onUpdate(this.props.id, val);

        // desabilita o modo de edição
        this.setState({editing: false});
    },
    remove: function() {
        console.log(this.props.id, "Remover tarefa");
        this.props.onRemove(this.props.id);
    },
    renderDisplay: function() {
        var category = '';
        if (this.props.category)
            category = <span className="category">{this.props.category}</span>;

        return (
            <li className="task">
                <label for="">
                    <input type="checkbox" defaultChecked={this.state.checked} onChange={this.handleCheck} /> 
                    <span id="task-text"> {this.props.children}</span> 
                </label>
                {category}                    
                <a className="glyphicon glyphicon-trash icon icon-remove" onClick={this.remove} href="#"></a>
                <a className="glyphicon glyphicon-pencil icon icon-edit" onClick={this.edit} href="#"></a>
            </li>
        );
    },
    renderForm: function() {
        return (
            <li className="task">
                <label for="">                    
                    <input className="form-control" type="text" id="task-text-edit" ref="taskInput" value={this.state.value} onChange={this.handleChange} />
                </label>                 
                <a className="glyphicon glyphicon-trash icon icon-remove" onClick={this.remove} href="#"></a>  
                <a className="glyphicon glyphicon-floppy-disk icon icon-save" onClick={this.save} href="#"></a>
                <a className="glyphicon glyphicon-chevron-left icon icon-back" onClick={this.back} href="#"></a>          
            </li>
        );
    },
    render: function() {        
        if (this.state.editing) {
            return this.renderForm();
        } else {
            return this.renderDisplay();
        }
    }
});






var Board = React.createClass({
    getInitialState: function() {
        return {
            tasks: [
                'Minha tarefa pessoal',
                'Subir site para o servidor',
                'Comprar batata e limão'
            ]
        }
    },
    showTasks: function() {
        console.log("****** TAREFAS ***************");
        console.log(this.state.tasks);
    },
    addTask: function(text) {
        var aux_tasks = this.state.tasks; 
        aux_tasks.push(text);
        this.setState({tasks: aux_tasks});
    },
    removeTask: function(i) {
        var aux_tasks = this.state.tasks;
        aux_tasks.splice(i, 1);
        this.setState({tasks: aux_tasks});
    },
    updateTask: function(i, value) {
        console.log("Update task");
        console.log(value);
        var aux_tasks = this.state.tasks;
        aux_tasks[i] = value;
        this.setState({tasks: aux_tasks});
    },
    render: function() {
        var self = this;
        return (
            <div className="board">
                <h2 className="board__titulo">Minhas tarefas</h2>
                {this.state.tasks.map(function(task, i){
                    return (
                        <Task id={i} 
                              onRemove={self.removeTask}
                              onUpdate={self.updateTask}>{task}</Task>
                    )
                })}
                <button className="btn btn-warning glyphicon glyphicon-plus ico-adicionar" onClick={this.addTask.bind(null, "Nova tarefa")}></button>
                <button className="btn btn-warning glyphicon glyphicon-eye-open ico-ver" onClick={this.showTasks}></button>
            </div>
        );
    }
})



React.render(<div>
                <Board></Board>
            </div>, document.body);