
App = {
    web3Provider: null,
    contracts: {},
    emptyAddress: "0x0000000000000000000000000000000000000000",
    sku: 0,
    upc: 0,
    productID: 0,
    metamaskAccountID: "0x0000000000000000000000000000000000000000",
    ownerID: "0x0000000000000000000000000000000000000000",
    originFarmerID: "0x0000000000000000000000000000000000000000",
    originFarmName: null,
    originFarmInformation: null,
    originFarmLatitude: null,
    originFarmLongitude: null,
    productNotes: null,
    productPrice: 0,
    distributorID: "0x0000000000000000000000000000000000000000",
    retailerID: "0x0000000000000000000000000000000000000000",
    consumerID: "0x0000000000000000000000000000000000000000",
    imageHash: "",
    fileBuffer: "",
    fileName: "",
    
    init: async function () {
        App.readForm();
        /// Setup access to blockchain
        return await App.initWeb3();
    },

    readForm: function () {
        App.sku = $("#sku").val();
        App.upc = $("#upc").val();
        App.productID = $("#productId").val();
        App.ownerID = $("#ownerID").val();
        App.originFarmerID = $("#originFarmerID").val();
        App.originFarmName = $("#originFarmName").val();
        App.originFarmInformation = $("#originFarmInformation").val();
        App.originFarmLatitude = $("#originFarmLatitude").val();
        App.originFarmLongitude = $("#originFarmLongitude").val();
        App.productNotes = $("#productNotes").val();
        App.productPrice = $("#productPrice").val();
        App.distributorID = $("#distributorID").val();
        App.retailerID = $("#retailerID").val();
        App.consumerID = $("#consumerID").val();
        
        console.log(
            App.sku,
            App.upc,
            App.productID,
            App.ownerID, 
            App.originFarmerID, 
            App.originFarmName, 
            App.originFarmInformation, 
            App.originFarmLatitude, 
            App.originFarmLongitude, 
            App.productNotes, 
            App.productPrice, 
            App.distributorID, 
            App.retailerID, 
            App.consumerID
        );
    },

    initWeb3: async function () {
        /// Find or Inject Web3 Provider
        /// Modern dapp browsers...
        if (window.ethereum) {
            App.web3Provider = window.ethereum;
            try {
                // Request account access
                await window.ethereum.enable();
            } catch (error) {
                // User denied account access...
                console.error("User denied account access")
            }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            App.web3Provider = window.web3.currentProvider;
        }
        // If no injected web3 instance is detected, fall back to Ganache
        else {
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
        }

        App.getMetaskAccountID();

        return App.initSupplyChain();
    },

    getMetaskAccountID: function () {
        web3 = new Web3(App.web3Provider);

        // Retrieving accounts
        web3.eth.getAccounts(function(err, res) {
            if (err) {
                console.log('Error:',err);
                return;
            }
            console.log('getMetaskID:',res);
            App.metamaskAccountID = res[0];

        })
    },

    initSupplyChain: function () {
        /// Source the truffle compiled smart contracts
        var jsonSupplyChain='../../build/contracts/SupplyChain.json';
        
        /// JSONfy the smart contracts
        $.getJSON(jsonSupplyChain, function(data) {
            console.log('data',data);
            var SupplyChainArtifact = data;
            App.contracts.SupplyChain = TruffleContract(SupplyChainArtifact);
            App.contracts.SupplyChain.setProvider(App.web3Provider);
            
            App.fetchItemBufferOne();
            App.fetchItemBufferTwo();
            App.fetchEvents();

        });

        return App.bindEvents();
    },

    bindEvents: function() {
        $(document).on('click', App.handleButtonClick);
        $(document).on('change', App.handleChangeEvent);
    },

    handleChangeEvent: async function(event) {
        event.preventDefault();

        App.getMetaskAccountID();

        var processId = parseInt($(event.target).data('id'));
        console.log('processId',processId);

        if (processId == 13) {
            return await App.captureFile(event);
        }
    },

    handleButtonClick: async function(event) {
        var processId = parseInt($(event.target).data('id'));
        console.log('processId',processId);

        if (processId != 13){
        event.preventDefault();

        App.getMetaskAccountID();

        switch(processId) {
            case 1:
                return await App.plantItem(event);
                break;
            case 2:
                return await App.growItem(event);
                break;
            case 3:
                return await App.harvestItem(event);
                break;
            case 4:
                return await App.processItem(event);
                break;
            case 5:
                return await App.packageItem(event);
                break;
            case 6:
                return await App.sellItem(event);
                break;
            case 7:
                return await App.buyItem(event);
                break;
            case 8:
                return await App.shipItem(event);
                break;
            case 9:
                return await App.receiveItem(event);
                break;
            case 10:
                return await App.purchaseItem(event);
                break;
            case 11:
                return await App.fetchItemBufferOne(event);
                break;
            case 12:
                return await App.fetchItemBufferTwo(event);
                break;
            case 13:
                break;
            case 14:
                return await App.uploadFile(event);
                break;
        }
        }
    },

    plantItem: function(event) {
        event.preventDefault();
        
        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.plantItem(
                App.upc, 
                App.metamaskAccountID, 
                App.originFarmName, 
                App.originFarmInformation, 
                App.originFarmLatitude, 
                App.originFarmLongitude, 
                App.productNotes, 
                {from: App.metamaskAccountID}
            );
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('plantItem',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    growItem: function(event) {
        event.preventDefault();
        
        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.growItem(App.productID, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('growItem',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },


    harvestItem: function(event) {
        event.preventDefault();
        
        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.harvestItem(App.productID, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('harvestItem',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    processItem: function (event) {
        event.preventDefault();
        
        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.processItem(App.productID, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('processItem',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },
    
    packageItem: function (event) {
        event.preventDefault();
        
        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.packageItem(App.productID, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('packageItem',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    sellItem: function (event) {
        event.preventDefault();
        
        App.contracts.SupplyChain.deployed().then(function(instance) {
            const productPrice = web3.toWei(1, "ether");
            console.log('productPrice',productPrice);
            return instance.sellItem(App.productID, App.productPrice, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('sellItem',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    buyItem: function (event) {
        event.preventDefault();
        
        App.contracts.SupplyChain.deployed().then(function(instance) {
            const walletValue = web3.toWei(3, "ether");
            return instance.buyItem(App.productID, {from: App.metamaskAccountID, value: walletValue});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('buyItem',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    shipItem: function (event) {
        event.preventDefault();
        
        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.shipItem(App.productID, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('shipItem',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    receiveItem: function (event) {
        event.preventDefault();
        
        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.receiveItem(App.productID, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('receiveItem',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    purchaseItem: function (event) {
        event.preventDefault();
        
        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.purchaseItem(App.productID, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('purchaseItem',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    fetchItemBufferOne: function () {
        App.upc = $('#upc').val();
        console.log('upc',App.upc);

        App.contracts.SupplyChain.deployed().then(function(instance) {
          return instance.fetchItemBufferOne(App.productID, {from: App.metamaskAccountID});
        }).then(function(result) {
          $("#ftc-item").text(result);
          console.log('fetchItemBufferOne', result);
        }).catch(function(err) {
          console.log(err.message);
        });
    },

    fetchItemBufferTwo: function () {
        App.contracts.SupplyChain.deployed().then(function(instance) {
          return instance.fetchItemBufferTwo.call(App.productID, {from: App.metamaskAccountID});
        }).then(function(result) {
          $("#ftc-item").text(result);
          console.log('fetchItemBufferTwo', result);
        }).catch(function(err) {
          console.log(err.message);
        });
    },

    fetchEvents: function () {
        if (typeof App.contracts.SupplyChain.currentProvider.sendAsync !== "function") {
            App.contracts.SupplyChain.currentProvider.sendAsync = function () {
                return App.contracts.SupplyChain.currentProvider.send.apply(
                App.contracts.SupplyChain.currentProvider,
                    arguments
              );
            };
        }

        App.contracts.SupplyChain.deployed().then(function(instance) {
        var events = instance.allEvents(function(err, log){
          if (!err)
            $("#ftc-events").append('<li>' + log.event + ' - ' + log.transactionHash + '</li>');
        });
        }).catch(function(err) {
          console.log(err.message);
        });
        
    },

    //Take file input from user
    captureFile: function (event) {
        event.stopPropagation()
        event.preventDefault()
        
        App.fileName = event.target.files[0]      
        
    },

    uploadFile: async function(event){
        event.preventDefault();
                
        const reader = new FileReader();
        reader.readAsBinaryString(App.fileName)
        reader.onloadend = async function() {
            //const buf = Buffer.Buffer(reader.result) // Convert data into buffer
            
            try{
                const ipfs = new Ipfs({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // Connect to IPFS
                ipfs.on('ready', () => {
                    const files = [
                        {
                            path: 'image.jpg',
                            content: ipfs.types.Buffer.from(btoa(reader.result),"base64")
                        }
                    ] 
                    ipfs.add(files, function (err, files) {
                        App.imageHash = "https://ipfs.io/ipfs/"+files[0].hash;
                        console.log(App.imageHash)
                        imageElement = `<img id="image" height=200px width=200px src=${App.imageHash}/>`;
                        document.getElementById("imageDiv").insertAdjacentHTML('beforeend', imageElement);
                        App.contracts.SupplyChain.deployed().then(function(instance) {
                            return instance.upload(App.productID, App.imageHash, {from: App.metamaskAccountID});
                        }).then(function(result) {
                            $("#ftc-item").text(result);
                            console.log('Upload Image',result);
                        }).catch(function(err) {
                            console.log(err.message);
                        });
                    })
                })
            } catch(err){
                console.log('ipfs issue' + err);
            }
        }
    }
};

$(function () {
    $(window).load(function () {
        App.init();
    });
});
