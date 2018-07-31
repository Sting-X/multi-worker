import uuid from './utils/uuid';
import GeneralUtils from './utils/GeneralUtils';
// import Promise from './Promise';
import P from './utils/promise';
import TaskQueue from './task/TaskQueue';
import calWorker from 'worker-loader!./webWorker/worker.js';
class worker {
    constructor(config = {}){
        
        this.id = config.id ? config.id : uuid.generate();

        this.worker = new calWorker();

        this.busy = false;

        // this.reslover = Promise.defer();
        this.reslover = new P();

        this.onMessage = this.onMessage.bind(this);

        this.onError = this.onError.bind(this);

        this.addListeners();

        TaskQueue.addTask(this);
    }

    excu(fn,args){
        if(this.busy)throw new Error (`id:${this.id} worker is busy`);

        var _fn , _args;
        
        if (fn && typeof fn === 'function') {
            _fn = GeneralUtils.serializeFunction(fn );
            _args = GeneralUtils.stringifyJson(args);
        }

        this.worker.postMessage({ _fn, _args})

        
        this.busy = true;

        return this.reslover.promise;
    }
    onMessage(e){

        let result  = GeneralUtils.parseJson(e.data);

        this.busy = false;
        
        TaskQueue.completeTask(this.id);

        return this.reslover.resolve(result);
    }
    onError(e){
        let error = GeneralUtils.parseJson(e.data);
        this.busy = false;
        this.reslover.promise.catch(error);
    }
    addListeners(){
        
        this.worker.addEventListener('message', this.onMessage);
        this.worker.addEventListener('error', this.onError);
    }
    removeListeners() {
        this.worker.removeEventListener('message', this.onMessage);
        this.worker.removeEventListener('error', this.onError);
    }
}
export default worker;