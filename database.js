/* HENTER RÅVARELISTEN */

const url = "https://kswscmjoqonxyqabktgv.supabase.co";

const key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtzd3NjbWpvcW9ueHlxYWJrdGd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM4MjM1OTEsImV4cCI6MjAwOTM5OTU5MX0.ILlRzBX-qHqmGfVcm73fU_PbsmGFQur9pOkETXzSAHE";

fetch("https://kswscmjoqonxyqabktgv.supabase.co/rest/v1/vildmad", {
  method: "GET",
  headers: {
    apikey: key,
  },
})
  .then((res) => res.json())
  .then(showData);

function showData(items) {
  console.log(items);
}


