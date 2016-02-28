var initialBoardState = {
  lists: [
    {_id:1,
      name:"Applied",
      icon_url:"appliedIcon.png",
      jobs: [
        {_id:1,
          title:"Software Developer",
          company: {
            name: "Google",
            icon_url: "googleLogo.png",
            hex_color: "#342345",
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
            icon_url: "amazonLogo.png",
            hex_color: "#342345",
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
      name:"Phone Interview",
      icon_url:"phoneIcon.png",
      jobs: [
        {_id:2,
          title:"Software Developer",
          company: {
            name: "Facebook",
            icon_url: "facebookLogo.png",
            hex_color: "#342345",
            glassdoor_id: "2345",
          },
          cities: [
            {name:"Seattle",state:"Washington",country:""},
            {name:"San Francisco",state:"California"},
          ],
        },
      ],
    }
  ],
}

module.exports = initialBoardState