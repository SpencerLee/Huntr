var initialBoardState = {
  lists: [
    {_id:1,
      name:"Applied",
      icon_url:"applied.png",
      jobs: [
        {_id:1,
          title:"Software Developer",
          company: {
            name: "Google",
            icon_url: "https://media.glassdoor.com/sqll/9079/google-squarelogo-1441130773284.png",
            hex_color: "rgba(252,189,0,0.85)",
            glassdoor_id: "2345",
          },
          cities: [
            {name:"Seattle",state:"Washington",country:""},
            {name:"Vancouver",state:"BC"},
          ],
        },
        {_id:3,
          title:"iOS Developer",
          company: {
            name: "Amazon",
            icon_url: "https://media.glassdoor.com/sqll/6036/amazon-com-squarelogo-1432805660196.png",
            hex_color: "rgba(255,136,13,0.85)",
            glassdoor_id: "2345",
          },
          cities: [
            {name:"Seattle",state:"Washington",country:""},
            {name:"San Francisco",state:"California"},
          ],
        },
      ],
    },
    {_id:2,
      name:"Phone",
      icon_url:"phone.png",
      jobs: [
        {_id:2,
          title:"Software Developer",
          company: {
            name: "Facebook",
            icon_url: "https://media.glassdoor.com/sqll/40772/facebook-squarelogo-1381810479272.png",
            hex_color: "rgba(57,87,155,0.85)",
            glassdoor_id: "2345",
          },
          cities: [
            {name:"Seattle",state:"Washington",country:""},
            {name:"San Francisco",state:"California"},
          ],
        },
      ],
    },
    {_id:1,
      name:"On Site",
      icon_url:"applied.png",
      jobs: [
        {_id:1,
          title:"Software Developer",
          company: {
            name: "Google",
            icon_url: "https://media.glassdoor.com/sqll/9079/google-squarelogo-1441130773284.png",
            hex_color: "rgba(252,189,0,0.85)",
            glassdoor_id: "2345",
          },
          cities: [
            {name:"Seattle",state:"Washington",country:""},
            {name:"Vancouver",state:"BC"},
          ],
        },
        {_id:3,
          title:"iOS Developer",
          company: {
            name: "Amazon",
            icon_url: "https://media.glassdoor.com/sqll/6036/amazon-com-squarelogo-1432805660196.png",
            hex_color: "rgba(255,136,13,0.85)",
            glassdoor_id: "2345",
          },
          cities: [
            {name:"Seattle",state:"Washington",country:""},
            {name:"San Francisco",state:"California"},
          ],
        },
      ],
    },
  ],
}

module.exports = initialBoardState