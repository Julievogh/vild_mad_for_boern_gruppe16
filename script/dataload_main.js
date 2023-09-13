const { createClient } = supabase
const _supabase = createClient('https://kswscmjoqonxyqabktgv.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtzd3NjbWpvcW9ueHlxYWJrdGd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM4MjM1OTEsImV4cCI6MjAwOTM5OTU5MX0.ILlRzBX-qHqmGfVcm73fU_PbsmGFQur9pOkETXzSAHE')
//console.log('Supabase Instance: ', _supabase)



// data pull
async function getProducts(id = null) {
    if(id != null) {
        const { data, error } = await _supabase
            .from('vildmad')
            .select()
            .eq('id', id); 
        console.log(data);
    }
    else {
        const { data, error } = await _supabase
            .from('vildmad')
            .select();
        console.log(data);
        let i = 0;
        data.forEach(function() {
            const temp = document.querySelector("#item_template").content;
            const copy = temp.cloneNode(true);
            copy.querySelector(".title").innerHTML = data[i].title;

            copy.querySelector(".find").setAttribute("href", "#find_" + data[i].id);
            copy.querySelector(".sans").setAttribute("href", "#sans_" + data[i].id);
            copy.querySelector(".raad").setAttribute("href", "#raad_" + data[i].id);

            copy.querySelector("#sans").setAttribute("id", "sans_" + data[i].id);
            copy.querySelector("#find").setAttribute("id", "find_" + data[i].id);
            copy.querySelector("#raad").setAttribute("id", "raad_" + data[i].id);

            copy.querySelector("#find_" + data[i].id + " p").textContent = data[i].sankning;
            copy.querySelector("#sans_" + data[i].id + " p").textContent = data[i].description_info;
            copy.querySelector("#raad_" + data[i].id + " p").textContent = data[i].season_info;

            //copy.querySelector(".category").innerHTML = "<strong>Kategori: </strong>" + data[i].categories_name;
            copy.querySelector(".description").innerHTML = data[i].description;
            //copy.querySelector(".sank_sted").innerHTML = "<strong>Sankested: </strong>" + data[i].sankested;
            //copy.querySelector(".sank_info").innerHTML = "<strong>Sankning: </strong>" + data[i].sankning;
            //copy.querySelector(".season_info").innerHTML = "<strong>Sæson: </strong>" + data[i].season_info;
            //copy.querySelector(".description_info").innerHTML = "<strong>Beskrivelse: </strong>" + data[i].description_info;
            copy.querySelector("img").setAttribute("src", data[i].profile_image_src);
            document.querySelector(".items").appendChild(copy);
            i++;
        })
    }
}


// pulls data from light table
async function getTitle(id) {
    const { data, error } = await _supabase
        .from('vildmad')
        .select('title')
        .eq('id', id);

    console.log(data[0].title);
    const para = document.querySelector("#para");
    para.innerHTML = data[0].title;
}

getProducts();

$(".item_info").tabs({
    collapsible: true
});