import React, { useEffect, useState } from 'react'
import { Box } from '@mui/system'
import BreadCrumbs from '../../../components/BreadCrumbs'
import { 
    Tabs,
    Tab,
    Paper,
    Badge
} from '@mui/material';
import CardOrder from './CardOrder';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { getPurchaseOrdersData, getPurchaseOrdersWaitingDP } from './reducers/purchaseOrdersReducers';
import CardOrderDP from './CardOrderDP';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}


const OrdersPage = () => {
    const dispatch = useDispatch()
    const store_purchaseorders = useSelector((state : RootState) => state.purchase_orders)

    // console.log(store_purchaseorders, 'storee po')

    const [value, setValue] = React.useState(0);
    const [loaded, setLoaded] = useState(false);
    const [loading, setLoading] = useState(true);
    const [loadedDP, setLoadedDP] = useState(false);
    const [loadingDP, setLoadingDP] = useState(true);
    const [dataPurchaseOrders, setDataPurchaseOrders] = useState<any[]>([]);

    const [dataReadyToProcess, setdataReadyToProcess] = useState<any>([]);
    const [dataWaitingDownPayment, setdataWaitingDownPayment] = useState<any>([]);

    // console.log(dataWaitingDownPayment, 'dataWaitingDownPayment')


    const functionChangeUpdate = (id_package : string, update : string, items : any) => {
      if(update === "false") {
        localStorage.setItem('default_items', JSON.stringify(items))
        const newData = dataReadyToProcess.map((obj : any) => {
          if(obj.code_package === id_package)
             return {
               ...obj,
               update: "true",
             }
          return obj
        });
        setdataReadyToProcess(newData)
      } else {
        const newData = dataReadyToProcess.map((obj : any) => {
          let check_local : any = localStorage.getItem('default_items')
          let default_items = check_local !== null ? JSON.parse(check_local) : []
          if(obj.code_package === id_package)
             return {
               ...obj,
               update: "false",
               items : default_items
             }
          return obj
        });
        setdataReadyToProcess(newData)
      }
      
    }

    const functionChangeQuantity = (newItems : any, id_package : string) => {
      const newData = dataReadyToProcess.map((obj : any) => {
        if(obj.code_package === id_package)
           return {
             ...obj,
             items: newItems
           }
        return obj
      });
      setdataReadyToProcess(newData)
    }

    const functionChangePrice = (newItems : any, id_package : string) => {
      const newData = dataReadyToProcess.map((obj : any) => {
        if(obj.code_package === id_package)
           return {
             ...obj,
             items: newItems
           }
        return obj
      });
      setdataReadyToProcess(newData)
    }

    function getPRCompleted(data:any) {
      let data_package = data.filter((key : any) => key.lastStatus === "Completed")
      return data_package
    }

    function getPRReadyToProcess(data:any) {
      let data_package = data.filter((key : any) => key.lastStatus === "Open")
      return data_package
    }

    function getPRPick(data:any) {
      let data_package = data.filter((key : any) => key.lastStatus === "Pick")
      return data_package
    }

    function getPRReadyToShip(data:any) {
      let data_package = data.filter((key : any) => key.lastStatus === "Ready to Ship")
      return data_package
    }

    function getPRShipped(data:any) {
      let data_package = data.filter((key : any) => key.lastStatus === "Shipped")
      return data_package
    }

    function getPurchaseRequest() {
      setDataPurchaseOrders(store_purchaseorders.data)
      let data = [...store_purchaseorders.data]
      let data_rtp = data.filter((key : any) => key.lastStatus === "Open")
      setdataReadyToProcess(data_rtp)
      setLoaded(true)
      setLoading(false)
    }

    function getPurchaseRequestWaitingDP() {
      setdataWaitingDownPayment(store_purchaseorders.data_dp)
      setLoadedDP(true)
      setLoadingDP(false)
    }

    useEffect(() => {
        dispatch(getPurchaseOrdersData()) 
        dispatch(getPurchaseOrdersWaitingDP())
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if(!store_purchaseorders.loading_dp) {
          getPurchaseRequestWaitingDP()
        }
        // eslint-disable-next-line
    }, [store_purchaseorders.loading_dp]);

    useEffect(() => {
      if(!store_purchaseorders.loading) {
        getPurchaseRequest()
      }
      // eslint-disable-next-line
  }, [store_purchaseorders.loading]);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    function getStyle (val : any) {
        return val === value ? 'white' : '#000'
    }


    function BadgeLabel ({name, total, index} : any) {
        return (
          <Badge 
            color="error" 
            badgeContent={total === 0 ? '0' : total}  
          >
           <Box sx={{ mr: 1, color: getStyle(index) }}>{name}</Box>
          </Badge>
        )
    }   

    return (
        <Box sx={{pt:2, pl:3, pr:3}}>
            <BreadCrumbs 
                isPage={false}
                current="Purchase Orders Page"
            />
           <Box sx={{pt:2}}>
                <h2>Purchase Orders</h2>
           </Box>

           <Box sx={{ width: '100%', mt: 3 }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor: '#0091d6'}}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" color="error">
                        <Tab label={<BadgeLabel name="Waiting Down Payment" total={dataWaitingDownPayment.length} index={0} />} {...a11yProps(0)} />
                        <Tab label={<BadgeLabel name="Ready to Proccess" total={getPRReadyToProcess(dataPurchaseOrders).length} index={1} />} {...a11yProps(1)} />
                        <Tab label={<BadgeLabel name="Pick & Pack" total={getPRPick(dataPurchaseOrders).length} index={2} />} {...a11yProps(2)} />
                        <Tab label={<BadgeLabel name="Ready to Ship" total={getPRReadyToShip(dataPurchaseOrders).length} index={3} />} {...a11yProps(3)} />
                        <Tab label={<BadgeLabel name="Shipped" total={getPRShipped(dataPurchaseOrders).length} index={4} />} {...a11yProps(4)} />
                        <Tab label={<BadgeLabel name="Delivered" total={getPRCompleted(dataPurchaseOrders).length} index={5} />} {...a11yProps(5)} />
                        <Tab label={<BadgeLabel name="Completed" total={getPRCompleted(dataPurchaseOrders).length} index={6} />} {...a11yProps(6)} />
                        <Tab label={<BadgeLabel name="Delayed" total={getPRCompleted(dataPurchaseOrders).length} index={7} />} {...a11yProps(7)} />
                    </Tabs>
                </Box>
                <Paper style={{ backgroundColor: '#ddd' }}>
                  <TabPanel value={value} index={0} >
                    { loadingDP ? "Loading..." :
                      <>
                      { loadedDP && 
                        <Box>
                          { !loadingDP && dataWaitingDownPayment.length === 0 ? "You dont have any Waiting Down Paymet orders yet!" : 
                            <CardOrderDP 
                              data={dataWaitingDownPayment} 
                            />
                          }
                        </Box> 
                      }
                      </>
                    }
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    { loading ? "Loading..." :
                      <>
                      { loaded && 
                        <Box>
                          { !loading && dataReadyToProcess.length === 0 ? "You dont have any Ready to Proccess orders yet!" : 
                            <CardOrder 
                              data={dataReadyToProcess} 
                              functionChangeUpdate={functionChangeUpdate} 
                              functionChangeQuantity={functionChangeQuantity}
                              functionChangePrice={functionChangePrice}
                            />
                          }
                        </Box> 
                      }
                      </>
                    }
                  </TabPanel>
                  <TabPanel value={value} index={2}>
                    { loading ? "Loading..." :
                      <>
                      { loaded && 
                        <Box>
                          { getPRPick(dataPurchaseOrders).length === 0 ? "You dont have any Pick & Pack orders yet!" : 
                            <CardOrder data={getPRPick(dataPurchaseOrders)} />
                          }
                        </Box> 
                      }
                      </>
                    }
                  </TabPanel>
                  <TabPanel value={value} index={3}>
                    { loading ? "Loading..." :
                      <>
                      { loaded && 
                        <Box>
                          { getPRReadyToShip(dataPurchaseOrders).length === 0 ? "You dont have any Ready to Ship orders yet!" : 
                            <CardOrder data={getPRReadyToShip(dataPurchaseOrders)} />
                          }
                        </Box> 
                      }
                      </>
                    }
                  </TabPanel>
                  <TabPanel value={value} index={4}>
                    { loading ? "Loading..." :
                      <>
                      { loaded && 
                        <Box>
                          { getPRShipped(dataPurchaseOrders).length === 0 ? "You dont have any Shipped orders yet!" : 
                            <CardOrder data={getPRShipped(dataPurchaseOrders)} />
                          }
                        </Box> 
                      }
                      </>
                    }
                  </TabPanel>
                  <TabPanel value={value} index={5}>
                    { loading ? "Loading..." :
                      <>
                      { loaded && 
                        <Box>
                          { getPRCompleted(dataPurchaseOrders).length === 0 ? "You dont have any Delivered orders yet!" : 
                            <CardOrder data={getPRCompleted(dataPurchaseOrders)} />
                          }
                        </Box> 
                      }
                      </>
                    }
                  </TabPanel>
                  <TabPanel value={value} index={6}>
                    { loading ? "Loading..." :
                      <>
                      { loaded && 
                        <Box>
                          { getPRCompleted(dataPurchaseOrders).length === 0 ? "You dont have any Completed orders yet!" : 
                            <CardOrder data={getPRCompleted(dataPurchaseOrders)} />
                          }
                        </Box> 
                      }
                      </>
                    }
                  </TabPanel>
                  <TabPanel value={value} index={7}>
                    { loading ? "Loading..." :
                      <>
                      { loaded && 
                        <Box>
                          { getPRCompleted(dataPurchaseOrders).length === 0 ? "You dont have any Delayed orders yet!" : 
                            <CardOrder data={getPRCompleted(dataPurchaseOrders)} />
                          }
                        </Box> 
                      }
                      </>
                    }
                  </TabPanel>
                </Paper>
           </Box>
        </Box>
    )
}

export default OrdersPage;
