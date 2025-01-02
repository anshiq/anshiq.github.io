import "./style.css";
document.querySelector("#app").innerHTML = `
  <h1 class="motion-opacity-in-0 motion-translate-y-in-100 motion-blur-in-md">
      Hello world!
  </h1>
`;
const setPageContent = (content) => { 
  document.querySelector("#app").innerHTML = content;
}
export { setPageContent };