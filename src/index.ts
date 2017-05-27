console.log("@islavi/storybook loaded");

let _storiesOf:Function = (name:string, module:any):void => {
    console.log("This name " + name);
}

export { _storiesOf as storiesOf };
