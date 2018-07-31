import worker from './registerWorker';
import TaskQueue from './task/TaskQueue';
// import Promise from './Promise';
// import P from './utils/promise';





class multiWorker {
    constructor(config = {}) {
        config.maxWorkers && TaskQueue.changeMaxWorkers(config.maxWorkers);
    }
    
    add(config = {}) {
        return new worker(config);
    }

    race(excuFns){
        let racePWorkers = [];
        let promises = [];

        for (let i = 0; i < excuFns.length; i++) {
            let worker = this.add();
            racePWorkers.push(worker);
            promises.push(worker.reslover.promise);
        }

        racePWorkers.map((worker, index) => {
            worker.excu(excuFns[index].fn, excuFns[index].args);
        });

        return Promise.race(promises)
    }
    all(excuFns) {
        let allPWorkers = [];
        let promises = [];

        for (let i = 0; i < excuFns.length; i++){
            let worker = this.add();
            allPWorkers.push(worker);
            promises.push(worker.reslover.promise);
        }

        allPWorkers.map((worker,index)=>{
            worker.excu(excuFns[index].fn, excuFns[index].args);
        });
        
        return Promise.all(promises)
  
    }
    getWorker(id){
       return TaskQueue.getTask(id);
    }
    getIdleWorker(id) {
        return TaskQueue.getIdleWorker(id);
    }
    removeWorker(id){
        return TaskQueue.removeTask(id);
    }
}

export default  multiWorker;