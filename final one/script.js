let title1,url1,total1;
let arr=[];
let source=[];

function top_headlines()
{
	fetch('https://newsapi.org/v2/top-headlines?sources=google-news&apiKey=2b2b21604b474729869dca8930baf376').
	then((res)=>{
		return res.json()
	})
// we returned res object into json object

	.then((data)=>{
		total1 = data.totalResults;
		console.log(total1);

//by using for loop we can iterate through all the <p> tags

		for(let i=0;i<total1;i++)
		{
			 title1=JSON.stringify(data.articles[i].title);
			 url1=JSON.stringify(data.articles[i].url);
			 arr.push(title1);
//here we are passing some html code at particular ids
			document.getElementById("demo"+i).innerHTML=`<a target="_blank" href=${url1}>
			<ul>
			<li id="list1"><span><b>${title1}</b></span></li>
			</ul>
			</a>`;
		}
	})
}



function search()
{
	let news=[];
	let keyword=document.getElementById("searchbox").value;

	for(let i=0;i<8;i++)
	{
		if (document.getElementById("news"+i).checked)
		{
			answr=document.getElementById("news"+i).value;
			news.push(answr);
		}
	}
	console.log(news);

	if(news.length!=0 )
	{
		if(keyword!='')
		{

			fetch(`https://newsapi.org/v2/everything?q=${keyword}&sources=${news}&apiKey=2b2b21604b474729869dca8930baf376`)
			.then((res)=>{

				return res.json()
			})

			.then((data)=>{
				let total2=data.totalResults;
				console.log(total2);
				if(data.totalResults > 0)
				{
					document.getElementById("heading1").innerHTML=`<b>Top Search Results for "${keyword}" are...<b>`;
					for(let i=0;i<10;i++)
					{
						if(total2!=0)
						{
							let title2=JSON.stringify(data.articles[i].title);
							let url2=JSON.stringify(data.articles[i].url);
							document.getElementById("demo"+i).innerHTML=`<a href=${url2}>
							<ul>
							<li id="list2"><b><span>${title2}</b></span></li>
							</ul>
							</a>`;
							total2=total2-1;
						}
						else
						{
							document.getElementById("demo"+i).innerHTML=" ";

						}
					}
					document.getElementById("heading2").innerHTML=`<b>Top Headlines</b>`;
					for(let j=0;j<total1;j++)
					{

						document.getElementById("result"+j).innerHTML=`<a target="_blank" href=${url1}>
						<ul>
						<li id="list1"><span><b>${arr[j]}</b></span></li>
						</ul>
						</a>`;
					}
				}
				else{
					alert(`No search results found for "${keyword}"`);


				}
			});
			if(keyword)
			{
				document.getElementById("searchbox").value="";
			}
			for(let i=0;i<8;i++)
			{
				if (document.getElementById("news"+i).checked)
				{
					document.getElementById("news"+i).checked=false;
				}
			}

		}
		else
		{
			alert("search for anything");
		}
	}

	else if(keyword =='' && news.length==0){
		alert("Search for anything and mandatory to check one of the news channel");
	}
	else{
		alert("It is mandatory to check one of the channel")
	}

}

let button_names=document.getElementsByClassName("but0");
let button_names_length=button_names.length;
	for(let i=0;i<button_names_length;i++)
	{
		console.log(button_names[i]);
		button_names[i].addEventListener("click",function(){
			if(document.getElementById("searchbox").value)
			{
				document.getElementById("searchbox").value="";
			}
			for(let i=0;i<8;i++)
			{
				if (document.getElementById("news"+i).checked)
				{
					document.getElementById("news"+i).checked=false;
				}
			}
		console.log(this.value);
		onChannelClick(this.value);
	});
	}


function onChannelClick(channel)
{

	fetch(`https://newsapi.org/v2/top-headlines?sources=${channel}&apiKey=2b2b21604b474729869dca8930baf376`).
	then((res)=>{
		return res.json()
	})

	.then((data)=>{
		let total3 = data.totalResults;
		console.log(total3);

		let heading=channel.toUpperCase();
		document.getElementById("heading1").innerHTML=`<b>${heading}<b>`;
		for(let i=0;i<total3;i++)
		{
			 let title3=JSON.stringify(data.articles[i].title);
			 let url3=JSON.stringify(data.articles[i].url);


			document.getElementById("demo"+i).innerHTML=`<a target="_blank" href=${url3}>
			<ul>
			<li id="list1"><span><b>${title3}</b></span></li>
			</ul>
			</a>`;
		}
	})



}
