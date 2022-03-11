import {
    View,
    ScrollView,
    StatusBar,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    AppState,
    Modal,
    FlatList,
    Dimensions,
    Animated
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import styles from './style';
import DatePicker from 'react-native-date-picker'
import moment from 'moment';
import {GlobalButton, AcceptButton, DataPickerGlobal} from '../../component';
import SelectDropdown from 'react-native-select-dropdown'
import AsyncStorage from '@react-native-async-storage/async-storage';
import StarRating from 'react-native-star-rating';
import DateTimePicker from '@react-native-community/datetimepicker';


let Width = Dimensions.get('window').width

export function AddInfo(props) {

    const [activeIndex, setActiveIndex] = useState((Number(moment().format('d')) === 0 ? 6 : (Number(moment().format('d')) - 1)))
    const [activColor, setActiveColor] = useState(false)
    const [dayInfo, setDayInfo] = useState()
    const [date, setDate] = useState('00:00')
    const [openAlco, setOpenAlco] = useState(false)
    const [openCoffee, setOpenCoffee] = useState(false)
    const [openExFrom, setOpenExFrom] = useState(false)
    const [openMedication, setOpenMedication] = useState(false)
    const [openExTo, setOpenExTo] = useState(false)
    const [openNapFrom, setOpenNapFrom] = useState(false)
    const [openNapTo, setOpenNapTo] = useState(false)
    const [openIntoBed, setOpenIntoBed] = useState(false)
    const [openGoSleep, setOpenGoSleep] = useState(false)
    const [openFallAsleep, setOpenFallAsleep] = useState(false)
    const [openWakeUpFrom, setOpenWakeUpFrom] = useState(false)
    const [showHide, setShowHide] = useState(false)
    const [openDataTime, setOpenDataTime] = useState(null)
    const [openWakeUpTo, setOpenWakeUpTo] = useState(false)
    const [openWakeUpTime, setOpenWakeUpTime] = useState(false)
    const [openOutOfBed, setOpenOutOfBed] = useState(false)
    const [alcoDrinks, setAlcoDrinks] = useState({
        x: '00:00',
        y: Number(0),
        info: "A"
    })
    const [medication, setMadication] = useState({
        x: '00:00',
        y: Number(0),
        info: "M"
    })
    const [coffee, setCoffee] = useState({
        x: '00:00',
        y: Number(0),
        info: "A"
    })
    const [exerciseFrom, setExerciseFrom] = useState({
        x: "from 00:00",
        y: Number(0),
        info: 'E'
    })
    const [exerciseTo, setExerciseTo] = useState({
        x: "to 00:00",
        y: Number(0),
        info: 'E'
    })
    const [napFrom, setNapFrom] = useState({
        x: "from 00:00",
        y: Number(0),
        info: 'N'
    })
    const [napTo, setNapTo] = useState({
        x: "to 00:00",
        y: Number(0)
    })
    const [intoBed, setIntoBed] = useState({
        x: '00:00',
        y: Number(0),
        info: 'T'
    })
    const [goSleep, setGoSleep] = useState({
        x: '00:00',
        y: Number(0),
    })
    const [wakeUpTime, setWakeUpTime] = useState({
        x: '00:00',
        y: Number(0)
    })
    const [outOfBed, setOutOfBed] = useState({
        x: '00:00',
        y: Number(0),
        info: 'U'
    })
    const [fallAsleep, setFallAsleep] = useState({
        x: '00:00',
        y: Number(0),
        info: 'F'
    })
    const [wakeUpFrom, setWakeUpFrom] = useState({
        x: "to 00:00",
        y: Number(0)
    })
    const [wakeUpTo, setWakeUpTo] = useState({
        x: "to 00:00",
        y: Number(0)
    })

    const [textAreaInput, setTextAreaInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [weekCountIndex, setWeekCountIndex] = useState(0)
    const [allData, setAllData] = useState([])
    const dayDataSave = useRef([])
    const [activeLeft, setActiveLeft] = useState(true)
    const [activeRight, setActiveRight] = useState(true)
    const [addWakeUp, setAddWakeUp] = useState([{
        wakeUpDataFrom: {
            x: 'from 00:00',
            y: Number(0)
        },
        wakeUpDataTo: {
            x: 'to 00:00',
            y: Number(0)
        },
    }])
    const countries = ["Work", "School", "Day off", "Vacation"]
    const [results, setResults] = useState([
        {
            sleepTime: Number(0),
            timeInBed: Number(0),
            efficiensySleep: Number(0),
            naps: Number(0),
            awakenings: Number(0),
            fallaSleepTime: Number(0),
            data: ''
        }
    ])
    const listRef = useRef()
    const [weekDay, setWeekDay] = useState([
        {
            week: "Mon",
            data: {}
        },
        {
            week: "Tue",
            data: {}
        },
        {
            week: "Wed",
            data: {}
        },
        {
            week: "Thu",
            data: {}
        },
        {
            week: "Fri",
            data: {}
        },
        {
            week: "Sat",
            data: {}
        },
        {
            week: "San",
            data: {}
        },
    ])
    const [weekCount, setWeekCount] = useState([weekDay])
    const [generalWeekData, setGeneralWeekData] = useState()
    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);
    const [modalVisible, setModalVisible] = useState(false);
    const [starCount, setStarCount] = useState(0)
    const weekData = useRef(null)
    const [weekIndex, setWeekIndex] = useState(0)
    let scrollX = useRef(new Animated.Value(0)).current


    function convertMS(ms) {
        var d, h, m, s;
        s = Math.floor(ms / 1000);
        m = Math.floor(s / 60);
        s = s % 60;
        h = Math.floor(m / 60);
        m = m % 60;
        d = Math.floor(h / 24);
        h = h % 24;
        h += d * 24;
        // return (  h +':' +   m)
        return (h < 10 ? '0' + h : h) + ':' + (m < 10 ? '0' + m : m)
    }


    let dayData = {
        fullDate: weekDay[activeIndex].data.fullDate,
        dayInfo,
        alcoDrinks,
        exerciseFrom,
        exerciseTo,
        napFrom,
        napTo,
        intoBed,
        goSleep,
        wakeUpTime,
        outOfBed,
        fallAsleep,
        wakeUpFrom,
        wakeUpTo,
        textAreaInput,
        loading,
        addWakeUp,
        results,
        starCount,
        medication,
        coffee
    }
    const reasetData = () => {
        setTextAreaInput('')
        setAlcoDrinks({
            x: '00:00',
            y: Number(0),
            info: 'A'
        })
        setMadication({
            x: '00:00',
            y: Number(0),
            info: 'A'
        })
        setCoffee({
            x: '00:00',
            y: Number(0),
            info: 'A'
        })
        setDate('')
        setDayInfo('')
        setExerciseFrom({
            x: "from 00:00",
            y: Number(0)
        })
        setExerciseTo({
            x: "to 00:00",
            y: Number(0)
        })
        setFallAsleep({
            x: '00:00',
            y: Number(0)
        })
        setGoSleep({
            x: '00:00',
            y: Number(0)
        })
        setIntoBed({
            x: '00:00',
            y: Number(0)
        })

        setNapFrom({
            x: "from 00:00",
            y: Number(0)
        })
        setNapTo({
            x: "to 00:00",
            y: Number(0)
        })
        setOutOfBed({
            x: '00:00',
            y: Number(0)
        })
        setWakeUpFrom({
            x: "to 00:00",
            y: Number(0)
        })
        setWakeUpTime({
            x: '00:00',
            y: Number(0)
        })
        setWakeUpTo({
            x: "to 00:00",
            y: Number(0)
        })
        setAddWakeUp([...[{
            wakeUpDataFrom: {
                x: 'from 00:00',
                y: Number(0)
            },
            wakeUpDataTo: {
                x: 'to 00:00',
                y: Number(0)
            },
        }]])
        setStarCount(0)
    }

    //---------------------Set Acync Storege data------------------------;
    const storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('days', JSON.stringify(value))
        } catch (e) {
            // saving error
        }
    }
    const weekDataStore = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('weekData', JSON.stringify(value))
        } catch (e) {
            // saving error
        }
    }

    const lastActiveDay = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('lastDay', JSON.stringify(value))
        } catch (e) {
            // saving error
        }
    }

    const dailyData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('dailyData', JSON.stringify(value))
        } catch (e) {
            // saving error
        }
    }

    //---------------------Get Acync Storege data------------------------

    const getStartDate = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('start')
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            // error reading value
        }
    }
    const getWeekData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('weekData')
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            // error reading value
        }
    }
    const getLastDay = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('lastDay')
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            // error reading value
        }
    }

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('days')
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            // error reading value
        }
    }

    let getInfo = async () => {

        let startDate = await getStartDate()
        let lastDay = await getLastDay()
        let infoDay = await getData()
        let weekData = await getWeekData()
        dayDataSave.current = infoDay

        // if (weekData === null) {
        //     reasetData()
        //     await weekDataStore(weekCount)
        //     getData()
        // }
        if (infoDay === null) {
            reasetData()
            await storeData([])
        }
        weekData !== undefined && setGeneralWeekData(weekData)
        let arr = weekCount[weekIndex]
        infoDay !== null && infoDay.map((data, index) => {
            weekCount[weekIndex].map((item, i) => {
                if (moment(data.fullDate).format('ddd') === item.week) {
                    arr[i].data = data
                }
            })
        })
        setWeekDay([...arr])
        if (lastDay !== 'null') {
            let mon = 1
            let today = moment().isoWeekday()
            let diff = (moment(lastDay.date).diff(moment().format("YYYY-MM-DD"), 'days'))


            const d = new Date();
            d.setDate(d.getDate() + ((7 - d.getDay()) % 7 + 1) % 7);
            let nextMon = moment(d).format('YYYY MMM DD')
            if (moment().format('YYYY MMM DD') === nextMon && weekCount[(weekCount.length - 1)][0].data.fullDate === 'undefined') {
                alert('It is Mon')
            }

            // console.log(moment().startOf('isoweek').isBefore(moment(lastDay.date)), 'fffffff');
            // if (Math.ceil(diff / 7) > 1) {
            //     setWeekCount([...weekCount, ...Array(Math.ceil(diff / 7)).fill(weekDay)])
            // }
            // if (moment().startOf('isoweek').isBefore(moment(lastDay.date)) || moment().startOf('isoweek')) {
            //     setWeekCount([...weekCount, weekDay])
            // }
        }
    }


    //------------------------- useEffect ---------------------------------

    //console.log(weekData.current.scrollToIndex());
    useEffect(() => {
        scrollX.addListener(({value}) => {
            setWeekIndex(Math.round(value / Width))
        })
        return (() => {
            scrollX.removeAllListeners()
        })
    }, [])

    useEffect(() => {
        const subscription = AppState.addEventListener("change", async (nextAppState) => {
            if (
                appState.current.match(/inactive|background/) &&
                nextAppState === "active"
            ) {
                // console.log("App has come to the foreground!");
            }
            appState.current = nextAppState;
            setAppStateVisible(appState.current);
            appState.current === "background" && await lastActiveDay({
                date: moment(new Date()).format('YYYY-MM-DD'),
                day: moment(new Date()).format('d')
            })
        });
        return () => {
            subscription.remove();
        };
    }, []);

    useEffect(() => {
        getInfo()

    }, []);

    // useEffect(() => {
    //     const unsubscribe = props.navigation.addListener('focus', () => {
    //     });
    //     return unsubscribe;
    // }, [props.navigation]);


    useEffect(() => {

        let example = [
            {
                week: "Mon",
                data: {
                    fullDate: '',
                    dayInfo,
                    alcoDrinks,
                    exerciseFrom,
                    exerciseTo,
                    napFrom,
                    napTo,
                    intoBed,
                    goSleep,
                    wakeUpTime,
                    outOfBed,
                    fallAsleep,
                    wakeUpFrom,
                    wakeUpTo,
                    textAreaInput,
                    loading,
                    addWakeUp,
                    results,
                    starCount
                }
            },
            {
                week: "Tue",
                data: {
                    fullDate: '',
                    dayInfo,
                    alcoDrinks,
                    exerciseFrom,
                    exerciseTo,
                    napFrom,
                    napTo,
                    intoBed,
                    goSleep,
                    wakeUpTime,
                    outOfBed,
                    fallAsleep,
                    wakeUpFrom,
                    wakeUpTo,
                    textAreaInput,
                    loading,
                    addWakeUp,
                    results,
                    starCount
                }
            },
            {
                week: "Wed",
                data: {
                    fullDate: '',
                    dayInfo,
                    alcoDrinks,
                    exerciseFrom,
                    exerciseTo,
                    napFrom,
                    napTo,
                    intoBed,
                    goSleep,
                    wakeUpTime,
                    outOfBed,
                    fallAsleep,
                    wakeUpFrom,
                    wakeUpTo,
                    textAreaInput,
                    loading,
                    addWakeUp,
                    results,
                    starCount
                }
            },
            {
                week: "Thu",
                data: {
                    fullDate: '',
                    dayInfo,
                    alcoDrinks,
                    exerciseFrom,
                    exerciseTo,
                    napFrom,
                    napTo,
                    intoBed,
                    goSleep,
                    wakeUpTime,
                    outOfBed,
                    fallAsleep,
                    wakeUpFrom,
                    wakeUpTo,
                    textAreaInput,
                    loading,
                    addWakeUp,
                    results,
                    starCount
                }
            },
            {
                week: "Fri",
                data: {
                    fullDate: '',
                    dayInfo,
                    alcoDrinks,
                    exerciseFrom,
                    exerciseTo,
                    napFrom,
                    napTo,
                    intoBed,
                    goSleep,
                    wakeUpTime,
                    outOfBed,
                    fallAsleep,
                    wakeUpFrom,
                    wakeUpTo,
                    textAreaInput,
                    loading,
                    addWakeUp,
                    results,
                    starCount
                }
            },
            {
                week: "Sat",
                data: {
                    fullDate: '',
                    dayInfo,
                    alcoDrinks,
                    exerciseFrom,
                    exerciseTo,
                    napFrom,
                    napTo,
                    intoBed,
                    goSleep,
                    wakeUpTime,
                    outOfBed,
                    fallAsleep,
                    wakeUpFrom,
                    wakeUpTo,
                    textAreaInput,
                    loading,
                    addWakeUp,
                    results,
                    starCount
                }
            },
            {
                week: "San",
                data: {
                    fullDate: '',
                    dayInfo,
                    alcoDrinks,
                    exerciseFrom,
                    exerciseTo,
                    napFrom,
                    napTo,
                    intoBed,
                    goSleep,
                    wakeUpTime,
                    outOfBed,
                    fallAsleep,
                    wakeUpFrom,
                    wakeUpTo,
                    textAreaInput,
                    loading,
                    addWakeUp,
                    results,
                    starCount
                }
            },
        ]

        //let dayNumberAll = moment(new Date()).daysInYear();

        // let weekNumber = moment(new Date(), "MM-DD-YYYY").week();
        // let weekNumberAll = moment(new Date()).weeksInYear();
        // let stayWeek = weekNumberAll - weekNumber
        let arr = []
        let arrDates = []
        let arrDatesWeek = []
        for (let i = 0; i < 365; i++) {
            if (arr.length) {
              //  arr.push(moment(arr[arr.length - 1], 'dddd, MMM DD, YYYY').add(1, 'days').format('dddd, MMM DD, YYYY'))
                /* arr.push(moment(arr[arr.length - 1], 'dddd, MMM DD, YYYY').add(1, 'days').format('dddd, MMM DD, YYYY'))
                 let weekDay = moment(arr[arr.length - 1]).format('dddd')
                 if(weekDay === 'Sunday' && arrDatesWeek.length){

                 }else{
                     let ex = example
                     for(let j = 0; j < new Array(i); j++){
                         ex[j].data.fullDate = arr[j]
                     }
                     arrDatesWeek.push(ex)
                 }*/
            } else {
                let ex = example
                arr.push(moment().format('dddd, MMM DD, YYYY'))
                // let weekDay = moment(arr[0]).format('ddd')
                const dow = moment(arr[0]).day();
                let difference = 7 - dow
                for (let j = 0; j <= difference; j++) {
                    let newDay = arr[0]
                    let weekDay = moment(arr[0]).format('ddd')
                    if (j !== 0) {
                        newDay = moment(arr[arr.length - 1], 'dddd, MMM DD, YYYY').add(j, 'days').format('dddd, MMM DD, YYYY')
                        weekDay = moment(newDay).format('ddd')

                    }
                    if (weekDay === 'Sun') {
                        ex[6].data.fullDate = newDay
                        arrDatesWeek.push(ex)
                    } else {
                        for (let k = 0; k < 7; k++) {
                            if (ex[k].week === weekDay) {
                                ex[k].data.fullDate = newDay
                            }
                        }

                    }

                }

            }
        }
        console.log(arrDatesWeek, arr);

    }, [])


    useEffect(() => {
        weekCount.map((data, index) => {
            data.map(item => {
                if (moment().format('dddd, MMM DD, YYYY') === item.data.fullDate) {
                    setWeekIndex(index)
                }
            })
        })
        weekData.current.scrollToOffset({
            offset: (weekIndex + 1) * Width
        })
    }, [weekCount])

    useEffect(() => {
        let arr = weekCount[weekIndex]
        if (activeIndex >= 0) {
            arr.map((data, index) => {
                if (!Object.keys(data.data).length && activeIndex >= index) {
                    let minus = activeIndex - index
                    data.data.fullDate = moment().subtract(minus, 'days').format('dddd, MMM DD, YYYY')
                }
            })
        }
    }, [weekIndex, activeIndex])


    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            getInfo()
        });
        return unsubscribe;
    }, [props.navigation]);


    function convertMtoH(n) {
        var num = n;
        var hours = (num / 60);
        var rhours = Math.floor(hours);
        var minutes = (hours - rhours) * 60;
        var rminutes = Math.round(minutes);
        return num = (rhours < 10 ? '0' + rhours : rhours) + " : " + (rminutes < 10 ? "0" + rminutes : rminutes);
    }

    function convertHtoM(timeInHour) {
        var timeParts = timeInHour.split(":");
        return Number(timeParts[0]) * 60 + Number(timeParts[1]);
    }

    let handleAdddata = async () => {
        setLoading(true)
        let infoDay = await getData()
        setAllData(infoDay)
        dayDataSave.current = [...infoDay, dayData]

        await storeData([...infoDay, dayData])
        let time = setTimeout(() => {
            setLoading(false)
            clearTimeout(time)
        }, 1500);
        let arr = weekCount[weekIndex]
        arr[activeIndex].data = dayData
        setWeekDay([...arr])
        reasetData()
        weekDataStore(weekCount)
        setModalVisible(!modalVisible)
    }

    let handleForward = () => {
        weekData.current.scrollToOffset({
            offset: (weekIndex + 1) * Width
        })
    }

    let handleBackward = () => {
        weekData.current.scrollToOffset({
            offset: (weekIndex - 1) * Width
        })
    }


    let weekDataRender = ((item, i) => {

        return (
            <Animated.View key={item.index} style={{
                width: Width,
            }}>
                <View style={{
                    height: 60,
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    paddingHorizontal: 12
                }}>
                    <View>
                        <TouchableOpacity onPress={handleBackward}>
                            <Image source={require('../../assets/img/leftpassive.png')}
                                   style={{width: 10, height: 15}}/>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.week}>Week {item.index + 1}</Text>
                    <View>
                        <TouchableOpacity onPress={handleForward}>
                            <Image source={require('../../assets/img/right.png')} style={{width: 10, height: 15}}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </Animated.View>
        )
    })

    return (
        loading ?
            <View style={styles.activLoad}>
                <ActivityIndicator size="small" color="#0000ff"/>
            </View>
            :
            <ScrollView contentContainerStyle={styles.scrollView}>
                <StatusBar backgroundColor={'#EFEFEF'} barStyle='dark-content'/>
                <View style={styles.topSide}>
                    <View style={styles.weekSide}>
                        {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {weekCount.map((item, index) => {
                                return <View key={index} style={{ width: Width }}>
                                    <Text style={styles.week}>Week {index + 1}</Text>
                                </View>
                            })}
                        </ScrollView> */}
                        <View style={{width: Width}}>
                            <Animated.FlatList
                                data={weekCount}
                                ref={weekData}
                                renderItem={weekDataRender}
                                keyExtractor={(item, index) => index}
                                horizontal
                                pagingEnabled
                                showsHorizontalScrollIndicator={false}
                                scrollEventThrottle={16}
                                onScroll={Animated.event(
                                    [{
                                        nativeEvent: {
                                            contentOffset: {x: scrollX}
                                        }
                                    }],
                                    {useNativeDriver: false}
                                )}
                            />
                        </View>


                    </View>
                    <View style={styles.weekDayName}>
                        {weekCount[weekIndex].map((item, index) => {
                            return (
                                <View key={index}>
                                    <TouchableOpacity onPress={() => {
                                        reasetData()
                                        weekCount[weekIndex][activeIndex].data.fullDate < moment().format('dddd, MMM DD, YYYY')
                                            ? (setActiveColor(!activColor),
                                                setActiveIndex(index)) :
                                            moment().format('d') > index ? (setActiveColor(!activColor),
                                                    setActiveIndex(index)) :
                                                moment().format('d') == 0 && (setActiveColor(!activColor),
                                                    setActiveIndex(index))
                                    }}
                                                      style={
                                                          [styles.weeKDaysForm,
                                                              {
                                                                  borderTopLeftRadius: index === 0 ? 10 : 0,
                                                                  borderBottomLeftRadius: index === 0 ? 10 : 0,
                                                                  borderTopRightRadius: index === 6 ? 10 : 0,
                                                                  borderBottomEndRadius: index === 6 ? 10 : 0,
                                                                  backgroundColor: activeIndex === index ? '#FFC430' : null
                                                              },
                                                          ]}>
                                        <Text
                                            style={[styles.weeKDaysText, {color: activeIndex === index ? '#FFF' : '#2B91BF'}]}>{item.week}</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        })}
                    </View>
                </View>
                {Object.keys(weekCount[weekIndex][activeIndex].data).length > 1 ?
                    <View style={styles.content}>
                        <Text style={styles.title}>{weekCount[weekIndex][activeIndex].data.fullDate}</Text>
                        <View style={styles.chooseType}>
                            <Text style={styles.globalText}>Is this a Work/ School/ Day off/ Vacation?</Text>
                            <TouchableOpacity style={styles.dataPicker}>
                                <Text style={styles.selectText}>{weekCount[weekIndex][activeIndex].data.dayInfo}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.chooseType}>
                            <Text style={styles.globalText}>What time did you last have coffee,cola or tea?</Text>
                            <TouchableOpacity style={styles.dataPicker}>
                                <Text
                                    style={styles.selectText}>{weekCount[weekIndex][activeIndex].data.coffee.x}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.chooseType}>
                            <Text style={styles.globalText}>What time did you last have alcoholic drinks?</Text>
                            <TouchableOpacity style={styles.dataPicker}>
                                <Text
                                    style={styles.selectText}>{weekCount[weekIndex][activeIndex].data.alcoDrinks.x}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.chooseType}>
                            <Text style={styles.globalText}>What time did you last exercise?</Text>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View>
                                    <TouchableOpacity style={styles.dataPicker}>
                                        <Text
                                            style={styles.selectText}>{weekCount[weekIndex][activeIndex].data.exerciseFrom.x}</Text>
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity style={styles.dataPicker}>
                                    <Text
                                        style={styles.selectText}>{weekCount[weekIndex][activeIndex].data.exerciseTo.x}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.chooseType}>
                            <Text style={styles.globalText}>What time did you last take a nap?</Text>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View>
                                    <TouchableOpacity style={styles.dataPicker}>
                                        <Text
                                            style={styles.selectText}>{weekCount[weekIndex][activeIndex].data.napFrom.x}</Text>
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity style={styles.dataPicker}>
                                    <Text
                                        style={styles.selectText}>{weekCount[weekIndex][activeIndex].data.napTo.x}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.chooseType}>
                            <Text style={styles.globalText}>What time did you get into bed?</Text>
                            <TouchableOpacity style={styles.dataPicker}>
                                <Text
                                    style={styles.selectText}>{weekCount[weekIndex][activeIndex].data.intoBed.x}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.chooseType}>
                            <Text style={styles.globalText}>What time did you turn off the lights to go sleep?</Text>
                            <TouchableOpacity style={styles.dataPicker}>
                                <Text
                                    style={styles.selectText}>{weekCount[weekIndex][activeIndex].data.goSleep.x}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.chooseType}>
                            <Text style={styles.globalText}>How long did it take you to fall asleep?</Text>
                            <TouchableOpacity style={styles.dataPicker}>
                                <Text
                                    style={styles.selectText}>{weekCount[weekIndex][activeIndex].data.fallAsleep.x}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.chooseType}>
                            <Text style={styles.globalText}>During the sleep, what timings did you wake up?</Text>
                            {weekCount[weekIndex][activeIndex].data.addWakeUp.map((item, index) => {
                                return (
                                    <View key={index} style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <View>
                                            <TouchableOpacity style={[styles.dataPicker, {marginBottom: 15}]}>
                                                <Text style={styles.selectText}>{item.wakeUpDataFrom.x}
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                        <TouchableOpacity style={styles.dataPicker}>
                                            <Text style={styles.selectText}>{item.wakeUpDataTo.x}</Text>
                                        </TouchableOpacity>
                                    </View>)
                            })}

                            <View style={styles.addForm}>
                                <TouchableOpacity>
                                    <Image source={require('../../assets/img/add.png')} style={styles.addFormImg}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.chooseType}>
                            <Text style={styles.globalText}>What was your final wake up time?</Text>
                            <TouchableOpacity style={styles.dataPicker}>
                                <Text
                                    style={styles.selectText}>{weekCount[weekIndex][activeIndex].data.wakeUpTime.x}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.chooseType}>
                            <Text style={styles.globalText}>Sleep madications</Text>
                            <TouchableOpacity style={styles.dataPicker}>
                                <Text
                                    style={styles.selectText}>{weekCount[weekIndex][activeIndex].data.medication.x}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.chooseType}>
                            <Text style={styles.globalText}>What time did you get out of bed?</Text>
                            <TouchableOpacity style={styles.dataPicker}>
                                <Text
                                    style={styles.selectText}>{weekCount[weekIndex][activeIndex].data.outOfBed.x}</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.chooseType}>
                            <Text style={styles.globalText}>Sleep medications</Text>
                            <TextInput
                                placeholderTextColor={'#2B91BF'}
                                editable={false}
                                style={styles.textArea}
                                numberOfLines={6}
                                multiline={true}
                                value={weekCount[weekIndex][activeIndex].data.textAreaInput}
                                onChangeText={(e) => setTextAreaInput(e)}
                            />
                        </View>

                        {weekCount[weekIndex].map((item, index) => {
                            if (index === activeIndex) {
                                return (<AcceptButton key={index} handleCount={() => {
                                    // alert(`${item.week}`)
                                    // setModalVisible(!modalVisible);
                                }}/>)
                            }
                        })}
                    </View>
                    :
                    <View style={styles.content}>
                        <Text style={styles.title}>{weekDay[activeIndex].data.fullDate}</Text>
                        <View style={styles.chooseType}>
                            <Text style={styles.globalText}>Is this a Work/ School/ Day off/ Vacation?</Text>
                            <SelectDropdown
                                data={countries}
                                buttonStyle={styles.selectStyle}
                                defaultButtonText="Choose"
                                buttonTextStyle={styles.selectText}
                                dropdownIconPosition='right'
                                rowTextStyle={{
                                    color: '#2B91BF',
                                    fontFamily: "Quicksand-Regular",
                                }}
                                dropdownStyle={
                                    {
                                        backgroundColor: '#FFF',
                                        borderRadius: 10
                                    }
                                }
                                onSelect={(selectedItem, index) => {
                                    setDayInfo(selectedItem)
                                }}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    return selectedItem
                                }}
                                rowTextForSelection={(item, index) => {
                                    return item
                                }}
                                renderDropdownIcon={() => <Image source={require('../../assets/img/open.png')}
                                                                 style={styles.iconStyle}/>}
                            />
                        </View>
                        <View style={styles.chooseType}>
                            <Text style={styles.globalText}>What time did you last have coffee,cola or tea?</Text>
                            <TouchableOpacity style={styles.dataPicker} onPress={() => setOpenCoffee(true)}>
                                <Text style={styles.selectText}>{coffee.x}</Text>
                            </TouchableOpacity>
                            <DatePicker
                                is24hourSource={'device'}
                                // textColor='#FFF'`
                                modal
                                mode={'datetime'}
                                open={openCoffee}
                                date={weekDay[activeIndex].data.fullDate ? new Date(weekDay[activeIndex].data.fullDate) : new Date()}
                                onConfirm={(time) => {
                                    setOpenCoffee(false)
                                    setCoffee({
                                        x: moment(time).format('hh:mm A'),
                                        y: new Date(time).getTime(),
                                        info: "C"
                                    })
                                }}
                                onCancel={() => {
                                    setOpenCoffee(false)
                                }}
                            />
                        </View>
                        <View style={styles.chooseType}>
                            <Text style={styles.globalText}>What time did you last have alcoholic drinks?</Text>
                            <TouchableOpacity style={styles.dataPicker} onPress={() => setOpenAlco(true)}>
                                <Text style={styles.selectText}>{alcoDrinks.x}</Text>
                            </TouchableOpacity>
                            <DatePicker
                                is24hourSource={'device'}
                                // textColor='#FFF'`
                                modal
                                mode={'datetime'}
                                open={openAlco}
                                date={weekDay[activeIndex].data.fullDate ? new Date(weekDay[activeIndex].data.fullDate) : new Date()}
                                onConfirm={(time) => {
                                    setOpenAlco(false)
                                    setAlcoDrinks({
                                        x: moment(time).format('hh:mm A'),
                                        y: new Date(time).getTime(),
                                        info: "A"
                                    })
                                }}
                                onCancel={() => {
                                    setOpenAlco(false)
                                }}
                            />
                        </View>
                        <View style={styles.chooseType}>
                            <Text style={styles.globalText}>What time did you last exercise?</Text>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View>
                                    <TouchableOpacity style={styles.dataPicker} onPress={() => setOpenExFrom(true)}>
                                        <Text style={styles.selectText}>{exerciseFrom.x}</Text>
                                    </TouchableOpacity>
                                    <DatePicker
                                        is24hourSource={'device'}
                                        // textColor='#FFF'
                                        modal
                                        mode={'datetime'}
                                        open={openExFrom}
                                        date={weekDay[activeIndex].data.fullDate ? new Date(weekDay[activeIndex].data.fullDate) : new Date()}
                                        onConfirm={(time) => {
                                            setOpenExFrom(false)
                                            setExerciseFrom({
                                                x: moment(time).format('hh:mm A'),
                                                y: new Date(time).getTime(),
                                                info: 'E'
                                            })
                                        }}
                                        onCancel={() => {
                                            setOpenExFrom(false)
                                        }}
                                    />
                                </View>
                                <TouchableOpacity style={styles.dataPicker} onPress={() => setOpenExTo(true)}>
                                    <Text style={styles.selectText}>{exerciseTo.x}</Text>
                                </TouchableOpacity>
                            </View>
                            <DatePicker
                                is24hourSource={'device'}
                                // textColor='#FFF'
                                modal
                                mode={'datetime'}
                                open={openExTo}
                                date={weekDay[activeIndex].data.fullDate ? new Date(weekDay[activeIndex].data.fullDate) : new Date()}
                                onConfirm={(time) => {
                                    setOpenExTo(false)
                                    setExerciseTo({
                                        x: moment(time).format('hh:mm A'),
                                        y: new Date(time).getTime(),
                                        info: "E"
                                    })
                                }}
                                onCancel={() => {
                                    setOpenExTo(false)
                                }}
                            />
                        </View>
                        <View style={styles.chooseType}>
                            <Text style={styles.globalText}>What time did you last take a nap?</Text>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View>
                                    <TouchableOpacity style={styles.dataPicker} onPress={() => setOpenNapFrom(true)}>
                                        <Text style={styles.selectText}>{napFrom.x}</Text>
                                    </TouchableOpacity>
                                    <DatePicker
                                        is24hourSource={'device'}
                                        // textColor='#FFF'
                                        modal
                                        mode={'datetime'}
                                        open={openNapFrom}
                                        date={weekDay[activeIndex].data.fullDate ? new Date(weekDay[activeIndex].data.fullDate) : new Date()}
                                        onConfirm={(time) => {
                                            setOpenNapFrom(false)
                                            setNapFrom({
                                                x: moment(time).format('hh:mm A'),
                                                y: new Date(time).getTime(),
                                                info: "N"
                                            })
                                        }}
                                        onCancel={() => {
                                            setOpenNapFrom(false)
                                        }}
                                    />
                                </View>
                                <TouchableOpacity style={styles.dataPicker} onPress={() => setOpenNapTo(true)}>
                                    <Text style={styles.selectText}>{napTo.x}</Text>
                                </TouchableOpacity>
                            </View>
                            <DatePicker
                                is24hourSource={'device'}
                                // textColor='#FFF'
                                modal
                                mode={'datetime'}
                                open={openNapTo}
                                date={weekDay[activeIndex].data.fullDate ? new Date(weekDay[activeIndex].data.fullDate) : new Date()}
                                onConfirm={(time) => {
                                    setOpenNapTo(false)
                                    setNapTo({
                                        x: moment(time).format('hh:mm A'),
                                        y: new Date(time).getTime()
                                    })
                                }}
                                onCancel={() => {
                                    setOpenNapTo(false)
                                }}
                            />
                        </View>
                        <View style={styles.chooseType}>
                            <Text style={styles.globalText}>What time did you get into bed?</Text>
                            <TouchableOpacity style={styles.dataPicker} onPress={() => setOpenIntoBed(true)}>
                                <Text style={styles.selectText}>{intoBed.x}</Text>
                            </TouchableOpacity>
                            <DatePicker
                                is24hourSource={'device'}
                                // textColor='#FFF'

                                modal
                                mode={'datetime'}
                                open={openIntoBed}
                                date={weekDay[activeIndex].data.fullDate ? new Date(weekDay[activeIndex].data.fullDate) : new Date()}
                                onConfirm={(time) => {
                                    setOpenIntoBed(false)
                                    setIntoBed({
                                        x: moment(time).format('hh:mm A'),
                                        y: new Date(time).getTime(),
                                        info: "T"
                                    })
                                }}
                                onCancel={() => {
                                    setOpenIntoBed(false)
                                }}
                            />
                        </View>
                        <View style={styles.chooseType}>
                            <Text style={styles.globalText}>What time did you turn off the lights to go sleep?</Text>
                            <TouchableOpacity style={styles.dataPicker} onPress={() => setOpenGoSleep(true)}>
                                <Text style={styles.selectText}>{goSleep.x}</Text>
                            </TouchableOpacity>
                            <DatePicker
                                is24hourSource={'device'}
                                // textColor='#FFF'
                                modal
                                mode={'datetime'}
                                open={openGoSleep}
                                date={weekDay[activeIndex].data.fullDate ? new Date(weekDay[activeIndex].data.fullDate) : new Date()}
                                onConfirm={(time) => {
                                    setOpenGoSleep(false)
                                    setGoSleep({
                                        x: moment(time).format('hh:mm A'),
                                        y: new Date(time).getTime()
                                    })
                                }}
                                onCancel={() => {
                                    setOpenGoSleep(false)
                                }}
                            />
                        </View>
                        <View style={styles.chooseType}>
                            <Text style={styles.globalText}>How long did it take you to fall asleep?</Text>
                            <TouchableOpacity style={styles.dataPicker} onPress={() => setOpenFallAsleep(true)}>
                                <Text style={styles.selectText}>{fallAsleep.x}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.chooseType}>
                            <Text style={styles.globalText}>During the sleep, what timings did you wake up?</Text>
                            {addWakeUp.map((item, index) => {
                                return (
                                    <View key={index} style={{marginVertical: 10}}>
                                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                            <View>
                                                <TouchableOpacity style={styles.dataPicker} onPress={() => {
                                                    setOpenDataTime({
                                                        type: 'wakeUpDataFrom',
                                                        index: index
                                                    })
                                                    setShowHide(true)
                                                }}>
                                                    <Text style={styles.selectText}>{item.wakeUpDataFrom.x}</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <TouchableOpacity style={styles.dataPicker} onPress={() => {
                                                setOpenDataTime({
                                                    type: 'wakeUpDataTo',
                                                    index: index
                                                })
                                                setShowHide(true)
                                            }}>
                                                <Text style={styles.selectText}>{item.wakeUpDataTo.x}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )
                            })}
                            <View style={styles.addForm}>
                                <TouchableOpacity onPress={() => {
                                    let obj = {
                                        wakeUpDataFrom: {
                                            x: 'from 00:00',
                                            y: Number(0),
                                            info: 'W'
                                        },
                                        wakeUpDataTo: {
                                            x: 'to 00:00',
                                            y: Number(0),
                                            info: 'W'
                                        },
                                    }
                                    setAddWakeUp([...addWakeUp, obj])
                                }}>
                                    <Image source={require('../../assets/img/add.png')} style={styles.addFormImg}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.chooseType}>
                            <Text style={styles.globalText}>What was your final wake up time?</Text>
                            <TouchableOpacity style={styles.dataPicker} onPress={() => setOpenWakeUpTime(true)}>
                                <Text style={styles.selectText}>{wakeUpTime.x}</Text>
                            </TouchableOpacity>
                            <DatePicker
                                is24hourSource={'device'}
                                // textColor='#FFF'
                                modal
                                mode={'datetime'}
                                open={openWakeUpTime}
                                date={weekDay[activeIndex].data.fullDate ? new Date(weekDay[activeIndex].data.fullDate) : new Date()}
                                onConfirm={(time) => {
                                    setOpenWakeUpTime(false)
                                    setWakeUpTime({
                                        x: moment(time).format('hh:mm A'),
                                        y: new Date(time).getTime()
                                    })
                                }}
                                onCancel={() => {
                                    setOpenWakeUpTime(false)
                                }}
                            />
                        </View>
                        <View style={styles.chooseType}>
                            <Text style={styles.globalText}>What time did you get out of bed?</Text>
                            <TouchableOpacity style={styles.dataPicker} onPress={() => setOpenOutOfBed(true)}>
                                <Text style={styles.selectText}>{outOfBed.x}</Text>
                            </TouchableOpacity>
                            <DatePicker
                                is24hourSource={'device'}
                                // textColor='#FFF'
                                modal
                                mode={'datetime'}
                                open={openOutOfBed}
                                date={weekDay[activeIndex].data.fullDate ? new Date(weekDay[activeIndex].data.fullDate) : new Date()}
                                onConfirm={(time) => {
                                    setOpenOutOfBed(false)
                                    setOutOfBed({
                                        x: moment(time).format('hh:mm A'),
                                        y: new Date(time).getTime(),
                                        info: "U"
                                    })
                                }}
                                onCancel={() => {
                                    setOpenOutOfBed(false)
                                }}
                            />
                        </View>
                        <View style={styles.chooseType}>
                            <Text style={styles.globalText}>Sleep medications</Text>
                            <TouchableOpacity style={styles.dataPicker} onPress={() => setOpenMedication(true)}>
                                <Text style={styles.selectText}>{medication.x}</Text>
                            </TouchableOpacity>
                            <DatePicker
                                is24hourSource={'device'}
                                // textColor='#FFF'
                                modal
                                mode={'datetime'}
                                open={openMedication}
                                date={weekDay[activeIndex].data.fullDate ? new Date(weekDay[activeIndex].data.fullDate) : new Date()}
                                onConfirm={(time) => {
                                    setOpenMedication(false)
                                    setMadication({
                                        x: moment(time).format('hh:mm A'),
                                        y: new Date(time).getTime(),
                                        info: "M"
                                    })
                                }}
                                onCancel={() => {
                                    setOpenMedication(false)
                                }}
                            />
                        </View>

                        <View style={styles.chooseType}>
                            <Text style={styles.globalText}>Sleep medications</Text>
                            <TextInput
                                placeholder='Record any other factors that may affect your sleep:'
                                placeholderTextColor={'#2B91BF'}
                                style={styles.textArea}
                                numberOfLines={6}
                                multiline={true}
                                value={textAreaInput}
                                onChangeText={(e) => setTextAreaInput(e)}
                            />
                        </View>
                        <GlobalButton text={'Save'} handlePress={() => {
                            let sleepTime = convertHtoM(convertMS(wakeUpTime.y - intoBed.y)) - addWakeUp.map((item) => convertHtoM(convertMS(item.wakeUpDataTo.y - item.wakeUpDataFrom.y))).reduce(
                                (previousValue, currentValue) => previousValue + currentValue,
                                0)
                            let timeInBed = convertHtoM(convertMS(outOfBed.y - intoBed.y))
                            let effective = Math.floor((sleepTime / timeInBed) * 100)
                            let awakenings = addWakeUp.map((item) => convertHtoM(convertMS(item.wakeUpDataTo.y - item.wakeUpDataFrom.y))).reduce(
                                (previousValue, currentValue) => previousValue + currentValue,
                                0)
                            let naps = convertHtoM(convertMS(napTo.y - napFrom.y))
                            let fallaSleepTime = fallAsleep.y
                            setResults([{
                                sleepTime,
                                timeInBed,
                                effective,
                                awakenings,
                                naps,
                                fallaSleepTime,
                                data: moment(weekDay[activeIndex].data.fullDate).format('YYYY-MMM-D')
                            }])
                            setModalVisible(!modalVisible)
                        }}/>
                    </View>
                }
                <DataPickerGlobal
                    showHide={showHide}
                    open={openWakeUpFrom}
                    date={weekDay[activeIndex].data.fullDate ? new Date(weekDay[activeIndex].data.fullDate) : new Date()}
                    confirm={(time) => {
                        setShowHide(false)
                        let data = addWakeUp;
                        data[openDataTime.index][openDataTime.type] = {
                            x: moment(time).format('hh:mm A'),
                            y: new Date(time).getTime()
                        }

                        setAddWakeUp([...data]);
                    }}
                    cancel={() => {
                        setShowHide(false)
                        setOpenDataTime(null)
                    }}
                />
                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>How would you rate qualityof your sleep?</Text>
                            <StarRating
                                disabled={false}
                                maxStars={5}
                                rating={starCount}
                                selectedStar={(rating) => setStarCount(rating)}
                                emptyStar={require('../../assets/img/empatyStar.png')}
                                fullStar={require('../../assets/img/fullStar.png')}
                                halfStar={require('../../assets/img/halfStar.png')}
                                starSize={28}
                                starStyle={{marginTop: 16}}
                            />
                            <View style={styles.modalBtnView}>
                                <View>
                                    <TouchableOpacity
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={() => setModalVisible(!modalVisible)}
                                    >
                                        <Text style={styles.textStyle}>Back</Text>
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <TouchableOpacity
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={handleAdddata}
                                    >
                                        <Text style={styles.textStyle}>Count</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={openFallAsleep}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setOpenFallAsleep(!openFallAsleep);
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalViewTime}>
                            <View style={styles.infoTextInput}>
                                <TextInput keyboardType='number-pad' style={styles.dataPicker} onChangeText={(e) => {
                                    setFallAsleep({
                                        x: Number(e),
                                        y: Number(e),
                                        info: "S"
                                    })
                                }}/>
                                <Text style={{marginLeft: 15, color: '#00405E'}}>min</Text>
                            </View>
                            <View style={styles.btnModal}>
                                <View style={{marginRight: 40}}>
                                    <TouchableOpacity onPress={() => setOpenFallAsleep(!openFallAsleep)}>
                                        <Text style={styles.btnModalTetx}>CANCEL</Text>
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <TouchableOpacity onPress={() => setOpenFallAsleep(!openFallAsleep)}>
                                        <Text style={styles.btnModalTetx}>CONFIRM</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>

                </Modal>
            </ScrollView>
    );
}

