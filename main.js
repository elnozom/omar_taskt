// imports



window.addEventListener('load', async () =>{
  // declare global vars
  const base_url = 'https://elrady.co/api/'
  const subgroups_div = document.querySelector(".main_div");
  const btn_toggle = document.querySelector(".controllers");
  const main_group_bottuns=document.querySelector(".groups");
  let sub_group;
  let acitveGroupIndex
  // dark mode code
  btn_toggle.addEventListener("click", function () {
    document.body.classList.toggle("dark");
  });

  // declare functions
  const inject_html =  (div ,class_name , val) => {
    const html = ` <div data-value="${val.GroupCode}" class="${class_name}"><h4>${val.GroupName}</h4></div>`;
    div.insertAdjacentHTML("beforeend", html);
  };


  // this function responsiple for cleaning the html 
  // before inserting elems from api into it
  clearHtmlDiv = (div) => {
    div.innerHTML = ''
  }
  const maingroup_list = async () => {
    const response=await fetch(`${base_url}group`);
    const data =await response.json();
    for (const val of data) {
      inject_html(main_group_bottuns , 'group' ,val);
    }
    acitveGroupIndex = 0
    subgroup_list(data[0].GroupCode)
    main_group_bottuns.children[0].classList.add('active')
    console.log(main_group_bottuns.children[0])
    sub_group=document.querySelectorAll(".group");
  }
  const subgroup_list =   async  (parent_group) => {
    const response = await fetch(`${base_url}group/${parent_group}`);
    const data = await response.json();
    clearHtmlDiv(subgroups_div)
    for (const val of data) {
      inject_html( subgroups_div, 'sub-group' ,val);
    }
  }

  // calss functions
  await maingroup_list();  
  
  for (let i = 0; i < sub_group.length; i++) {
    const val = sub_group[i];
    val.addEventListener('click',function(){
      if(typeof acitveGroupIndex != 'undefined') sub_group[acitveGroupIndex].classList.remove('active')
      val.classList.add('active')
      acitveGroupIndex = i
      subgroup_list(val.getAttribute('data-value'));
    })
  }
})