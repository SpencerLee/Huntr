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
    {_id:3,
      name:"On Site",
      icon_url:"onsite.png",
      jobs: [
        {_id:1,
          title:"Senior Developer",
          company: {
            name: "Pinterest",
            icon_url: "https://media.glassdoor.com/sql/503467/pinterest-squarelogo.png",
            hex_color: "rgba(201,37,46,0.85)",
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
            name: "Indeed",
            icon_url: "https://media.glassdoor.com/sql/100561/indeed-squarelogo.png",
            hex_color: "rgba(14,99,251,0.85)",
            glassdoor_id: "2345",
          },
          cities: [
            {name:"Seattle",state:"Washington",country:""},
            {name:"San Francisco",state:"California"},
          ],
        },
      ],
    },
    {_id:4,
      name:"Offer",
      icon_url:"offer.png",
      jobs: [
        {_id:1,
          title:"Senior Developer",
          company: {
            name: "Zenefits",
            icon_url: "https://media.glassdoor.com/sql/820238/zenefits-squarelogo-1418154603330.png",
            hex_color: "rgba(247,174,79,0.85)",
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
            name: "Instacart",
            icon_url: "https://media.glassdoor.com/sql/714486/instacart-squarelogo-1453239842138.png",
            hex_color: "rgba(71,174,52,0.85)",
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