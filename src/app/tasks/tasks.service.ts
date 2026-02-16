import { Injectable, inject, signal } from "@angular/core";
import { Task, TaskStatus } from "./task.model";
import { LoggingService } from "../logging.service";

@Injectable({
    providedIn: 'root',
})
export class TasksService {
    private tasks = signal<Task[]>([]);
    private loggingService = inject(LoggingService);
    allTasks = this.tasks.asReadonly();
    addTask(taskdata: {title: string, description: string}){
        const newTask: Task = {
            ...taskdata,
            id: Math.random().toString(),
            status: 'OPEN',
        }
        this.tasks.update((oldTask) => [...oldTask, newTask]);
        this.loggingService.log('ADDED TASK WITH TITLE:' + taskdata.title);
    }
    updateTaskStatus(taskId: string, newStatus: TaskStatus) {
        this.tasks.update((oldTasks) =>
          oldTasks.map((task) =>
            task.id === taskId ? { ...task, status: newStatus } : task
          )
        );
        this.loggingService.log('CHANGE TSK STATUS TO '+ newStatus);
      }
}