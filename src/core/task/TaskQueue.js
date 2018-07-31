import GeneralUtils from './../utils/GeneralUtils';
let TaskQueue = {
    config: {
        maxWorkers : (window.navigator && window.navigator.hardwareConcurrency) || 3,
        minWorkers : 1
    },
    queue: [],  // call queue
    allTasks: {}, // all workers
    excuTask: [], //excu workers

    changeMaxWorkers(max){
        TaskQueue.config.maxWorkers = max;
    },
    addTask(task){
        if (!task) return;
        let id = task.id;
        TaskQueue.allTasks[id] = task;
        TaskQueue.queue.push(id);
        setTimeout(() => {
            TaskQueue.updateQueue();
        }, 0);

    },
    removeTask(id){
        if( id && TaskQueue.allTasks[id]){
            let index = TaskQueue.queue.indexOf(id);
            index > -1 &&  TaskQueue.queue.splice(index, 1);
            TaskQueue.allTasks[id].removeListeners();
            TaskQueue.allTasks[id] = null;
            delete TaskQueue.allTasks[id];
        }
    },
    getTask(id){
        let workers = {};
        let selectId = id ? GeneralUtils.id2Arr(id) : Object.keys(TaskQueue.allTasks);

        if (typeof id == 'string' || 'number' && TaskQueue.allTasks[id]) return TaskQueue.allTasks[id];

        selectId && selectId.forEach((workerId) => {
            TaskQueue.allTasks[workerId] && (workers[workerId] = TaskQueue.allTasks[workerId]);
        });
        return workers;
    },
    getIdleWorker(id) {
        let idleWorkers = {};
        let selectId = id ? GeneralUtils.id2Arr(id) : Object.keys(TaskQueue.allTasks);

        if (typeof id == 'string' || 'number' && TaskQueue.allTasks[id]) return TaskQueue.allTasks[id];
        selectId && selectId.forEach((workerId) => {
            TaskQueue.allTasks[workerId] && !TaskQueue.allTasks[workerId].busy && (idleWorkers[workerId] = TaskQueue.allTasks[workerId]);
        });

        return idleWorkers;
    },
    getNextTask(id){
        if (!TaskQueue.queue.length)return;
        id = id ? id : TaskQueue.queue.shift();
        let canExcuTask = !!(TaskQueue.allTasks[id] && !TaskQueue.allTasks[id].busy && TaskQueue.allTasks[id].excuMethods) ;
        return canExcuTask ? id : TaskQueue.getNextTask();
    },
    updateQueue(){
        if (TaskQueue.excuTask >= TaskQueue.config.maxWorkers)return;
        while (TaskQueue.excuTask.length < TaskQueue.config.maxWorkers) {
            let nextId = TaskQueue.getNextTask();
            if (!(nextId && !TaskQueue.allTasks[nextId].busy))break;
            let _fn = TaskQueue.allTasks[nextId].excuMethods._fn;
            let _args = TaskQueue.allTasks[nextId].excuMethods._args;
            TaskQueue.excuTask.push(nextId);
            TaskQueue.allTasks[nextId].excu(_fn, _args)
        }
    },
    completeTask(id){
        if(!id)return;
        let index = TaskQueue.excuTask.indexOf(id) ;
        TaskQueue.excuTask.splice(index, 1);
        TaskQueue.updateQueue();
    }
    

}
export default TaskQueue;