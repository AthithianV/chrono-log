import { create } from "zustand";


type State = {
    tags: Tag[],
    tag: Tag|null,
    tagFormView: boolean,
}

type Action = {
    addTag: (tag:Tag)=>void,
    setTags: (Tags: Tag[]) => void,
    updateTag: (tag: Tag)=>void,
    toggleTagFormView: (view:boolean)=>void,
    selectTag: (tag:Tag)=>void,
}

const useTag = create<State & Action>((set)=>({
    tags: [
        {name: "Frontend", details:"", color: "#00f", id: 1},
        {name: "Backend", details:"", color: "#0f0", id: 2},
        {name: "DSA", details:"", color: "#f00", id: 3},
        {name: "Rust", details:"", color: "#f0f", id: 4},
        {name: "Study", details:"", color: "#0ff", id: 5},
    ],
    tagFormView: false,
    tag: null,

    setTags: (tags)=>set(()=>({tags})),
    selectTag: (tag)=>set(()=>({tag, tagFormView: true})),
    updateTag: (tag)=>set((state)=>{
        const index = state.tags.findIndex(t=>t.id===tag.id);
        state.tags[index] = tag;
        return {tags: state.tags};
    }),
    addTag: (tag)=>set((state)=>{
        state.tags.push(tag);
        return {tags: state.tags};
    }),
    toggleTagFormView: (view)=>set(()=>({tagFormView: view, tag: null}))
}));

export default useTag;