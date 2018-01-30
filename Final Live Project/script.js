let tot;
let arr_tit=[],arr_url=[],arr_img=[],arr_des=[];
let source=[];

//********************************** Creating event Listeners to every news Channel **************************************

let button_names=document.getElementsByClassName("but0");
let button_names_length=button_names.length;
	for(let i=0;i<button_names_length;i++)
	{
		//console.log(button_names[i]);
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
		console.log("You clicked " + this.value + " eventListener(button)");
		onChannelClick(this.value);
	});
	}


//************************************************ top_headlines Function *****************************************************

function top_headlines()
{
	let title1,url1,total1,image1,description1,passing;
	let result=[];
//fetch top-headlines data from google api
	fetch('https://newsapi.org/v2/top-headlines?sources=google-news&apiKey=2b2b21604b474729869dca8930baf376').
	then((res)=>{
		return res.json()
	})
// we returned res object into json object

	.then((data)=>{
		total1 = data.articles.length;
		console.log("Total articles length in top_headlines function is : " +total1);

		let heading=`<h1 "style=color:darkblue;"><b>Top Headlines...<b></h1>`;
		result=[heading];
		for(let i=0;i<total1;i++)
		{
			 description1=JSON.stringify(data.articles[i].description);
			 image1=JSON.stringify(data.articles[i].urlToImage);
			 title1=JSON.stringify(data.articles[i].title);
			 url1=JSON.stringify(data.articles[i].url);

//passing description1,image,title1,url1 as global values to get access these in other functions
			arr_tit.push(title1);
			arr_des.push(description1);
			arr_img.push(image1);
			arr_url.push(url1);
			des=description1;
			img=image1;
			tit=title1;
			url=url1;
			tot=total1;

			passing=`<a target="_blank" href=${url1}>
			<ul><img src=${image1}  width="150" height="150"> <b>${title1}</b></a>
			<li id="list1"><span>Description : ${description1}</span></li>
			</ul>
			`;
			result.push(passing);

		}
//displaying dynamically our titles and images in the div tag ="demo"
		result=result.join('');
		document.getElementById("demo").innerHTML=result;

})
.catch(e=>{ console.log("Error in top_headlines then statement is : " +e);})
} // end of top_headlines function

//*********************************************** Search Function *************************************************************

function search()
{
	let news=[];
	let keyword=document.getElementById("searchbox").value;

//take the values into an array whose checkboxes are checked
	for(let i=0;i<8;i++)
	{
		if (document.getElementById("news"+i).checked)
		{
			answr=document.getElementById("news"+i).value;
			news.push(answr);
		}
	}
	console.log("Checked channels are as : " +news);

//entering into a new world when a keyword is searched with atleast one checkbox is checked.
	if(news.length!=0 )
	{
		if(keyword!='')
		{

			fetch(`https://newsapi.org/v2/everything?q=${keyword}&sources=${news}&apiKey=2b2b21604b474729869dca8930baf376`)
			.then((res)=> res.json()

			)

			.then((data)=>{
				// const mydata= data.json();
				//const mydata = data;
				//console.log("???????", mydata)
				let total2=data.articles.length;
				console.log("The number of articles found for your keyword are : " +total2);
				if(total2 > 0)
				{
					heading1=`<h1 "style=color:darkblue;"><b>Top Search Results for "${keyword}" are...<b></h1>`;
					let result=[heading1];

					//document.getElementById("heading1").innerHTML=`<b>Top Search Results for "${keyword}" are...<b>`;
					for(let i=0;i<20 ;i++)
					{

						if(total2!=0)
						{
							//console.log("^^^^^^^^^^^^^^^^^^^^^^^^^   ",i,"   ",mydata.articles[i]["url"])
							if(!data.articles[i]["urlToImage"])
							{
								//console.log("************* ");
								//console.log("********************  ",mydata.articles[i].urlToImage);
								continue;
							}
							let description2=JSON.stringify(data.articles[i].description);
							let image2=JSON.stringify(data.articles[i].urlToImage);
							let title2=JSON.stringify(data.articles[i].title);
							let url2=JSON.stringify(data.articles[i].url);
							let display=`<a href=${url2}>
							<ul><img src=${image2}  width="150" height="150"> <b>${title2}</b></a>
							<li id="list2"><span><b>Description: ${description2}</b></span></li>
							</ul>
							`;
							total2=total2-1;
							result.push(display);
            //  console.log(result)
						}

					}
					result=result.join('');
					document.getElementById("demo").innerHTML=result;
					document.getElementById("heading2").innerHTML=`<b>Top Headlines</b>`;

//here we are printing headlines in the bottom when any search keyword is triggered
					for(let j=0;j<tot;j++)
					{
						document.getElementById("result"+j).innerHTML=`<a target="_blank" href=${arr_url[j]}>
						<ul><img src=${arr_img[j]}  width="150" height="150"> <b>${arr_tit[j]}</b></a>
						<li id="list1"><span><b>Description : ${arr_des[j]}</b></span></li>
						</ul>
						`;
					} // end of "data.articles > 0" condition
				}
				else{
					alert(`No search results found for "${keyword}"`);
				}
			})
			.catch(e=> {console.log("Error in search then statement is : " +e);})

//for changing keyword to null and checked status to false after triggering some function
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
//if some thing present in search box if condition works else we alert error
		else
		{
			alert("search for anything");
		}
	}
//end of if condition when we are checked atleast one of the check checkbox

	else if(keyword =='' && news.length==0){
		alert("Search for anything and mandatory to check one of the news channel");
	}
	else{
		alert("It is mandatory to check one of the channel")
	}

} // end of search function


//************************************************ onChannelClick Function ******************************************************

function onChannelClick(channel)
{
	let heading,description3,title3,image3,title_news;
	let result=[];
//getting data from addEventListener of which channel has pressed on navigation key by that we can pass argument to our link to fetchdata from that particular api
	fetch(`https://newsapi.org/v2/top-headlines?sources=${channel}&apiKey=2b2b21604b474729869dca8930baf376`).
	then((res)=>{
		return res.json()
	})

	.then((data)=>{
		let total3 = data.articles.length;
		console.log("Total articles length in onChannelClick function is : " +total3);

//our heading will be in small letter and changing to upper case
		heading=channel.toUpperCase();
		heading=`<h1><b> ${heading} </b></h1>`;

//passing our heading into result array
		result=[heading];

//looping through the number of articles to find is there any urlToImage is set to null
		for(let i=0;i<total3;i++)
		{
			if(data.articles[i].urlToImage==null)
			{
				console.log(null);
				continue;
			}

//getting description,title,url and image of that particular channel articles
 			 description3=JSON.stringify(data.articles[i].description);
			 title3=JSON.stringify(data.articles[i].title);
			 url3=JSON.stringify(data.articles[i].url);
			 image3=JSON.stringify(data.articles[i].urlToImage);

//our html code will be saved in title_news on every iteration
			title_news=`<a target="_blank" href=${url3}>
 			<ul><img src=${image3}  width="150" height="150"> <b>${title3}</b></a>
 			<li id="list1"><span><b>Description : ${description3}</b></span></li>
 			</ul>
 			`;
			//console.log(title_news);

//our title_news will be pushed into an array named "result" on every iteration
			result.push(title_news);
		}

//after end of for loop we get the div tag id "demo" and replace that with our array "result" which consists html code of title_news on every iteration
		result=result.join('');
		document.getElementById("demo").innerHTML=result;
	})
	.catch(e=>{console.log("Error in onChannelClick ten statement is : " +e);})

} // end  of onChannelClick Function
