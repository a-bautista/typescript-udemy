// Drag and drop interfaces
interface Draggable{
    dragStartHandler(event: DragEvent): void;
    dragEndHandler(event: DragEvent): void;
}

interface DragTarget {
    dragOverHandler(event: DragEvent): void ;
    dropHandler(event: DragEvent): void;
    dragLeaveHandler(event: DragEvent): void;
}

enum ProjectStatus{ Active, Finished }

// Project type
class Project {
    constructor(public id: string,
                public title: string,
                public description: string,
                public people: number,
                public status: ProjectStatus)
            {}
}

// Project State Management
type Listener = (items: Project[]) => void;

class ProjectState {
    private listeners: Listener[] = []; // I created my own types
    private projects: Project[] = [];
    private static instance: ProjectState;
    private constructor(){

    }

    static getInstance(){
        if (this.instance){
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }

    // you receive a function
    //addListener(listenerFn: Function){
    addListener(listenerFn: Listener){
        this.listeners.push(listenerFn);
    }

    addProject(title: string, description: string, numOfPeople: number){
        // const newProject = {
        //     id: Math.random().toString(),
        //     title: title,
        //     description: description,
        //     people: numOfPeople
        // };
        const newProject =  new Project(Math.random().toString(), title, description, numOfPeople, ProjectStatus.Active);
        this.projects.push(newProject);
        for (const listenerFn of this.listeners){
            // slice indicates to send a copy of the array
            // we send copies and not the original values
            listenerFn(this.projects.slice());
        }
    }
}

const projectState = ProjectState.getInstance();

interface Validate {
    value: string | number;
    required?: boolean; // ? questionable, it might be or not present
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
}

// class ProjectListFinished implements DragTarget {
//     dragOverHandler(event: DragEvent){};
//     dropHandler(event: DragEvent) {};
//     dragLeaveHandler(event: DragEvent) {};
// }

class ProjectList {
    templateElement: HTMLTemplateElement;
    renderedElement: HTMLDivElement;
    element: HTMLElement;
    assignedProjects: any[];

    constructor(private type: 'active' | 'finished'){
        //! indicates that there will always exist the project-input, so there won't exist a null
        this.templateElement = document.getElementById('project-list')! as HTMLTemplateElement;
        this.renderedElement = document.getElementById('app')! as HTMLDivElement;
        this.assignedProjects = [];

        // We get access to the content from the template
        // true means to copy all nested elements
        const importedContent = document.importNode(
            this.templateElement.content,
            true
        );

        this.element = importedContent.firstElementChild as HTMLElement;
        // user-input belongs to the CSS
        this.element.id = `${this.type}-projects`;
        
        // send an anonymous function
        projectState.addListener((projects: Project[]) => {
            const relevantProjects = projects.filter(project => {
                if (this.type === 'active'){
                    return project.status === ProjectStatus.Active;
                }
                    return project.status === ProjectStatus.Finished;
            });
            this.assignedProjects = relevantProjects;
            // render each project in the list
            this.renderProjects();
        });

        this.render();
        this.renderContent();
    }

    private renderProjects(){
        const listEl = document.getElementById(`${this.type}-project-list`)! as HTMLUListElement;
        listEl.innerHTML = '';
        for (const projectItem of this.assignedProjects){
            const listItem = document.createElement('li');
            listItem.textContent = projectItem.title;
            listEl.appendChild(listItem);
        }
    }

    private renderContent(){
        const listId = `${this.type}-project-list`;
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS';
    }

    private render(){
        // render elements for the active and finished projects
        this.renderedElement.insertAdjacentElement('beforeend', this.element);
    }

    // dragStartHandler(event: DragEvent){

    // }

    // dragEndHandler(event: DragEvent){
    //     console.log('DragEnd');
    // }

     // when you click on the button, do an action (addEventListener which contains the function submitHandler)
    // configure(){
    //     this.element.addEventListener('dragStart', this.dragStartHandler.bind(this));
    // }
}

class ProjectInput {
    templateElement: HTMLTemplateElement;
    renderedElement: HTMLDivElement;
    element: HTMLFormElement;
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor(){
        //! indicates that there will always exist the project-input, so there won't exist a null
        this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
        this.renderedElement = document.getElementById('app')! as HTMLDivElement;

        // We get access to the content from the template
        // true means to copy all nested elements
        const importedContent = document.importNode(
            this.templateElement.content,
            true
        );

        this.element = importedContent.firstElementChild as HTMLFormElement;
        // user-input belongs to the CSS
        this.element.id = 'user-input';

        // we need to cast becasue TS won't know what will be returned value
        this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;
        this.configure();
        this.render();
    }

    // the input parameter is of interface type Validate
    // validateInput contains all these new properties: value, required, minLength, maxLength, min, max
    private validate(validateInput: Validate){
        let isValid = true;
        if (validateInput.required){
            // if length is different from zero then return false
            isValid = isValid && validateInput.value.toString().trim().length !== 0; 
        }
        // != means undefined is included
        if (validateInput.minLength != null && typeof validateInput.value === 'string'){
            isValid = isValid && validateInput.value.length > validateInput.minLength;
        }
        if (validateInput.maxLength != null && typeof validateInput.value === 'string'){
            isValid = isValid && validateInput.value.length < validateInput.maxLength;
        }
        if (validateInput.min != null && typeof validateInput.value === 'number' ){
            isValid = isValid && validateInput.value >= validateInput.min;
        }
        if (validateInput.max != null && typeof validateInput.value === 'number' ){
            isValid = isValid && validateInput.value < validateInput.max;
        }
        return isValid;
    }

    // return a tuple of string, string and number or void
    private gatherUserInput(): [string, string, number] | void {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value;

        const titleValidate: Validate = {
            value: enteredTitle,
            required: true
        };
        
        const descriptionValidate: Validate = {
            value: enteredDescription,
            required: true,
            min: 1
        };

        const peopleValidate: Validate = {
            value: +enteredPeople,
            required: true,
            min: 1,
            max: 10
        };

        // if any value is missing in the form
        // if (enteredTitle.trim().length === 0 ||
        //     enteredDescription.trim().length === 0 || enteredPeople.trim().length === 0){
        //     alert('Invalid input');
        if (!this.validate(titleValidate) || !this.validate(descriptionValidate) || !this.validate(peopleValidate)){
            alert('Invalid input');
            return ;
        }else{
            return [enteredTitle, enteredDescription, +enteredPeople];
        }
    }

    private clearInput(){
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value = '';
    }

    private submitHandler(event: Event){
        event.preventDefault();
        const userInput = this.gatherUserInput();
        // if userInput is a tuple
        if (Array.isArray(userInput)){
            const [title, desc, people] = userInput;
            projectState.addProject(title, desc, people);
            this.clearInput();
        }
    }

    // when you click on the button, do an action (addEventListener which contains the function submitHandler)
    private configure(){
        this.element.addEventListener('submit', this.submitHandler.bind(this));
    }

    private render(){
        // render the form for asking about a project
        this.renderedElement.insertAdjacentElement('afterbegin', this.element);
    }
}

// render the from with TypeScript
const projectInput = new ProjectInput();
const activeProjectList = new ProjectList('active');
const finishedProjectList = new ProjectList('finished');