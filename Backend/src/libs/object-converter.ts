export const convertObjectToDyamoDB = (item: any) => {
    item['meetingStartTime'] = item[`m#${item['meetingStartTime']}`]
    delete item['meetingStartTime']
    return item;
}

export const convertObjectToJson = (item: any) => {

    for(let k in item){
        const [key, value] = k.split('#');
        if(key === 'm') {
            item["meetingStartTime"] = value;
        }
    }
    return item;
}