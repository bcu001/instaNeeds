const nameToSlug = (name)=>{
    return name.trim().toLowerCase().replace(/\s+/g,'-');
}

export default nameToSlug;