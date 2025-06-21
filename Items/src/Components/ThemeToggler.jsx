import { useEffect,useState } from "react"
import Toggle from "./Toggle";
const ThemeToggler=()=>{
    const getInitailTheme=()=>{
        if(typeof localStorage!==undefined && localStorage.theme){
            return localStorage.theme;
        }
        return window.matchMedia("(prefers-color-scheme:dark)").matches?"dark":"light";
    }
    const [theme,setTheme]=useState(getInitailTheme);

    useEffect(()=>{
        if (theme === "dark") {
          document.documentElement.classList.add("dark");
        } 
        else {
          document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("theme",theme);},[theme]);

    const ToggleFn=()=>{
        console.log("ji")
        setTheme(prev=>prev=='light'?'dark':'light')
    }
    return (
        <>
            <div className="">
            <Toggle ToggleFn={ToggleFn} checked={theme === 'dark'}></Toggle>
            </div>
        </>
    )
}
export default ThemeToggler;