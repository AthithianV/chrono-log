import { create } from "zustand"

type State = {
    theme: 'light' | 'dark'
}

type Action = {
    toggleTheme: ()=>void
}

const themeStored = localStorage.getItem("theme") as 'light' | 'dark' | null;

const useTheme = create<State&Action>((set)=>({
    theme: themeStored?themeStored:'light',
    toggleTheme: ()=>set((state)=>{
        if(state.theme==='light'){
            return {theme: 'dark'}
        }else{
            return {theme: 'light'}
        }
    })
}))

export default useTheme;