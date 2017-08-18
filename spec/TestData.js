'use strict';
module.exports = {
    citiesProvider: function() {
        return [
            'Philadelphia,PA',
            'Miami,FL',            
            'wexford,PA',
            'Atlanta,Ga',
            'lexington,KY',
            'Pittsburgh,PA'            
        ];
    },
    //link,pos,inputId,titleId,autocompleteItem 
    propertySearchLinks: function () {
        return [
            { link: 'linksPropertySearch', inputId: 'inputForSale', titleId:'titleInSearch', dataToSearch:'Philadelphia,PA', autocompleteItem:'autocompleteItem', pos:0},
            { link: 'linksPropertySearch', inputId: 'inputHomeEstimates', titleId:'titleInHomeEstimate', dataToSearch:'Miami, FL', autocompleteItem:'autocompleteItemHomeEstimate', pos:1},
            { link: 'linksPropertySearch', inputId: 'inputAgents', titleId:'titleInAgents', dataToSearch:'wexford, PA', autocompleteItem:'autocompleteItemAgents', pos:2},
            { link: 'linksPropertySearch', inputId: 'inputOffices', titleId:'titleInOffices', dataToSearch:'Pittsburgh, PA', autocompleteItem:'autocompleteItemOffices', pos:3}
        ];
    },
    classesLink: function() {
        return [
            'icon-facebook',
            'icon-twitter',
            'icon-googleplus',
            'icon-youtube',
            'icon-linkedin',
            'icon-pinterest',
            'icon-instagram' 
        ];
    },
    socialMediaLinks: function () {
        return [
            {url:'https://www.facebook.com/remax', link: 'btnSocialMedia', text: 'Facebook', newWindows:'true', pos:0},
            {url:'https://twitter.com/remax', link: 'btnSocialMedia', text: 'Twitter', newWindows:'true', pos:1},
            {url:'https://plus.google.com/+remax', link: 'btnSocialMedia', text: 'Google plus', newWindows:'true', pos:2},
            {url:'https://www.youtube.com/user/REMAXIntl/Home', link: 'btnSocialMedia', text: 'Youtube', newWindows:'true', pos:3},
            {url:'https://www.linkedin.com/company/remax', link: 'btnSocialMedia', text: 'Linkedin', newWindows:'true', pos:4},
            {url:'https://www.pinterest.com/remax/', link: 'btnSocialMedia', text: 'Pinterest', newWindows:'true', pos:5},
            {url:'https://www.instagram.com/remax/', link: 'btnSocialMedia', text: 'Instagram', newWindows:'true', pos:6}            
        ];
    },
    elementPageLogin: function(){
        return [
            "btnCreateAccount", "btnForgotPassword", "btnSignIn", "btnPrivacy" 
        ];
    }, 
    linkCrawlPaths: function(){
        return [
            {title:'Homes for sale by City', link: 'linkByCities', list:['Homes For Sale in Philadelphia', 'Homes For Sale in Atlanta', 'Homes For Sale in Chicago', 'Homes For Sale in Los Angeles', 'Homes For Sale in Jacksonville']},
            {title:'Homes for sale by State', link: 'linkByState' , list:['Homes For Sale in AL', 'Homes For Sale in AK', 'Homes For Sale in AZ', 'Homes For Sale in AR', 'Homes For Sale in CA']},
            {title:'Homes for sale by Zip Code', link: 'linkByZipCode' , list:['Homes For Sale in 28906', 'Homes For Sale in 34145', 'Homes For Sale in 29582', 'Homes For Sale in 40475', 'Homes For Sale in 32137']},
            {title:'Homes for sale by County', link: 'linkByCounty' , list:['Homes For Sale in Los Angeles', 'Homes For Sale in Jefferson', 'Homes For Sale in Orange', 'Homes For Sale in Montgomery', 'Homes For Sale in Washington']}
        ];
    },


    placeholder: function(){
        return [
            {title:'City and State, Address or Zip Code', link: 'linkForSale', input:'inputForSale'},
            {title:'Property Address, City or Zip Code', link: 'linkHomeEstimates' , input:'inputHomeEstimates'},
            {title:'City, State or Zip Code', link: 'linkAgents' , input:'inputAgents'},
            {title:'City, State or Zip Code', link: 'linkOffices' , input:'inputOffices'}
        ];
    },

    loginData: function(){
        return [
        {description:'Login with empty data', mail: '', pass: '',case:'1'},
        {description:'Login with rigth data',mail: 'rmlead1@gmail.com', pass: '1',case:'2'},
        {description:'Login with user not registered',mail: 'test@gmail.com', pass: '123',case:'3'}
        ];
    },
    linkLoginForm: function(){
        return [
            {link: 'btnForgotPassword', element: 'btnSendMePassword'},
            {link: 'btnPrivacy', element: 'privacyPolicy'},
            {link: 'btnCreateAccount', element: 'btnCreateFreeAccount'}
        ];
    },
    propertyBlocksTitle: function(){
        return [
            'Price Reductions', 'New Listings', 'Open Houses',' Virtual Tours', 'Luxury', 'Foreclosures'
        ];
    },
    searchTypes: function(){
        return ['FOR SALE', 'HOME ESTIMATES', 'AGENTS', 'OFFICES'];
    },
    propertyBlocksLink:function(){
        return [
            {url:'pricecut', link: 'propertyBlocksTitles', text: 'Price Reductions', newWindows:'false', pos:0},
            {url:'newlisting', link: 'propertyBlocksTitles', text: 'New Listings', newWindows:'false', pos:1},
            {url:'openhouse', link: 'propertyBlocksTitles', text: 'Open Houses', newWindows:'false', pos:2},
            {url:'virtualtour', link: 'propertyBlocksTitles', text: 'Virtual Tours', newWindows:'false', pos:3},
            {url:'luxury', link: 'propertyBlocksTitles', text: 'Luxury', newWindows:'false', pos:4},
            {url:'foreclosures', link: 'propertyBlocksTitles', text: 'Foreclosures', newWindows:'false', pos:5}
            ];
    },
    portalBlocksTitles:function(){
        return ['Worldwide', 'Commercial', 'Luxury'];
    },
    portalBlocksRedirect:function(){
        return [
            {url:'global.remax.com', link: 'btnSearchGlobal', text: 'Search Global', newWindows:'true', pos:0},
            {url:'www.remaxcommercial.com', link: 'btnSearchCommercial', text: 'Find a home for your business', newWindows:'true', pos:0},
            {url:'www.theremaxcollection.com', link: 'btnSearchLuxury', text: 'Discover Luxury', newWindows:'true', pos:0}
            ];
    },
    
     interactionLinks:function(){
        return [
            {url:'http://blog.remax.com/', link:'btnBlogExploreMoreArticles', text: 'Explore more articles', newWindows:'true', pos:0},
            {url:'http://www.remax.com/general/mobile-apps/', link:'btnGetApp', text: 'Download For Free', newWindows:'true', pos:0}                        
            ];
    },
    worldContentFooter:function(){
        return [
            {url:'http://global.remax.com/default.aspx', link:'linksWorldContentFooter', text: 'Worldwide property search', newWindows:'true', pos:0},
            {url:'https://www.remax-franchise.com/', link:'linksWorldContentFooter', text: 'Worldwide franchise opportunities', newWindows:'true', pos:1}           
            ];
    },
    remaxContentFooter:function(){
        return [
            {url:'http://www.remax.com/newsroom/', link:'linksRemaxContentFooter', text: 'Newsroom', newWindows:'false', pos:0},
            {url:'http://blog.remax.com/', link:'linksRemaxContentFooter', text: 'Blog', newWindows:'true', pos:1},
            {url:'http://www.remax.com/newsroom/company-info/officer-bios/', link:'linksRemaxContentFooter', text: 'Leadership', newWindows:'false', pos:2},
            {url:'https://recruiting.ultipro.com/', link:'linksRemaxContentFooter', text: 'Careers', newWindows:'true', pos:3}             
            ];
    },
    businessContentFooter:function(){
        return [
            {url:'https://www.remax-franchise.com/', link:'linksBusinessContentFooter', text: 'Invest in a RE/MAX franchise', newWindows:'true', pos:0},
            {url:'http://www.joinremax.com/', link:'linksBusinessContentFooter', text: 'Become a RE/MAX agent', newWindows:'true', pos:1}  
            ];
    },
    investorContentFooter:function(){
        return [
            {url:'http://investors.remax.com/investor-relations/home/default.aspx', link:'linksInvestorContentFooter', text: 'RE/MAX Investors', newWindows:'false', pos:0}
            ];
    },
    otherContentFooter:function(){
        return [
            {url:'http://www.remaxcommercial.com/', link:'linksOthersContentFooter', text: 'RE/MAX Commercial', newWindows:'true', pos:0},
            {url:'http://www.theremaxcollection.com/', link:'linksOthersContentFooter', text: 'RE/MAX Collection', newWindows:'true', pos:1}
            ];
    },
    supportsContentFooter:function(){
        return [
            {url:'http://www.remax.com/newsroom/company-info/giving-back/', link:'linksSupportsContentFooter', text: '', newWindows:'true', pos:0}
            ];
    },
    linksFooter:function(){
        return [
            {url:'http://quantro.enqa-remax.com/general/sitemap/', link:'linksFooter', text: 'Sitemap', newWindows:'false', pos:0},
            {url:'http://quantro.enqa-remax.com/corporate/terms-of-use/', link:'linksFooter', text: 'Terms of Use', newWindows:'false', pos:1},
            {url:'http://quantro.enqa-remax.com/corporate/privacy-policy/', link:'linksFooter', text: 'Privacy Policy', newWindows:'false', pos:2},
            {url:'https://www.maxcntr.com/auth', link:'linksFooter', text: 'RE/MAX Affiliate Log In', newWindows:'true', pos:3}             
            ];
    },
    linkAgentsSearch:function(){
        return [
            {url:'http://quantro.enqa-remax.com/officeagentsearch/#agentsearch', link:'btnAgentsSearch', text: 'Let\'s Work Together', newWindows:'false', pos:0}
            ];
    },
    infoBlock:function(){
        return[
            {btn:'btnViewGallery', elementToCheck:'resultViewGallery'},
            {btn:'btnViewMap', elementToCheck:'resultViewMap'},   
            {btn:'btnAsk', elementToCheck:'resultAsk'},
            {btn:'btnMoreListing', elementToCheck:'resultMoreListing'},
            {btn:'btnFilterMoreOptions', elementToCheck:'btnApplyFilters'}
        ];
    },
    disclaimerSponsoringElement: function(){
        return[           
            {id:'officeBranding'},   
            {id:'officeDisclaimer'},
            {id:'courtesyOf'},
            {id:'disclaimerText'},
            {id:'officeInformation'}                
        ];
    },
    elementAdvancedSearch: function(){
        return[
            {id:'inputLocation'},
            {id:'inputMinPrice'},   
            {id:'inputMaxPrice'},
            {id:'selectBeds'},
            {id:'selectBaths'},
            {id:'selectSquareFeet'},
            {id:'selectLotSize'},
            {id:'selectAgeOfHome'}                
        ]; 
    },
    listingType: function(){
        return[
            {text:'New', pos:0},
            {text:'Open Houses', pos:1},
            {text:'Price Cuts', pos:2},
            {text:'Luxury', pos:3},
            {text:'Virtual Tours', pos:4}
        ];
    },
    propertyType: function(){
        return[
            {text:'Single Family', pos:0},
            {text:'Condo/Townhouse', pos:1},
            {text:'Multi-Family', pos:2},
            {text:'Vacant Land', pos:3},
            {text:'Mobile Home', pos:4}
        ];
    },
    elementListingDetailsPage: function(){
        return[
            {id:'btnPlaces'},
            {id:'btnShare'},   
            {id:'btnHide'},
            {id:'shareItems'},
            {id:'btnPhotos'},
            {id:'btnMapInrix'},
            {id:'contactForm'},
            {id:'filmstrim'},
            {id:'propertyInfo'}
                          
        ]; 
    },
    /**
     * location, minPrice, maxPrice, beds, baths, squareFeet, lotSize, ageHome, new, openHouses,
     * priceCuts, Luxury, virtualTours, singleFamily, condoTownHouse, multiFamily, vacantLand, movileHome
     */
    advancedSearchData: function(){
        return[
        {
            location:'Miami, FL', 
            minPrice:'15000', 
            maxPrice:'200000', 
            beds:'4', 
            baths:'3', 
            squareFeet:'3', 
            lotSize:'', 
            ageHome:'',
            new: '', 
            openHouses: '',
            priceCuts: '', 
            Luxury: '', 
            virtualTours: '', 
            singleFamily: '', 
            condoTownHouse: '', 
            multiFamily: '', 
            vacantLand: '', 
            movileHome: ''
        }
       
    ];  
    }
        
}