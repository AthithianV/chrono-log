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
    toggleTagFormView: ()=>void,
    selectTag: (tag:Tag)=>void,
}

const useTag = create<State & Action>((set)=>({
    tags: [],
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
    toggleTagFormView: ()=>set((state)=>({tagFormView: !state.tagFormView, tag: null}))
}));

export default useTag;