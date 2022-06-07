import {
    ActivityIndicator,
    Alert,
    Animated,
    AppState,
    Dimensions,
    Image,
    Modal,
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    KeyboardAvoidingView
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import styles from './style';
import DatePicker from 'react-native-date-picker'
import moment from 'moment';
import { AcceptButton, DataPickerGlobal, GlobalButton } from '../../component';
import SelectDropdown from 'react-native-select-dropdown'
import AsyncStorage from '@react-native-async-storage/async-storage';
import StarRating from 'react-native-star-rating';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { isSearchBarAvailableForCurrentPlatform } from 'react-native-screens';
import { is24HourFormat } from 'react-native-device-time-format'


let Width = Dimensions.get('window').width

export function AddInfo(props) {
    const [activeIndex, setActiveIndex] = useState((Number(moment().format('d')) === 0 ? 6 : (Number(moment().format('d')) - 1)))
    const [activColor, setActiveColor] = useState(false)
    const [dayInfo, setDayInfo] = useState()
    const [prevDayInfo, setPrevDayInfo] = useState()
    const [date, setDate] = useState('00:00')
    const [openAlco, setOpenAlco] = useState(false)
    const [openCoffee, setOpenCoffee] = useState(false)
    const [openExFrom, setOpenExFrom] = useState(false)
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
    const [isMon, setIsMon] = useState(true)
    const [alcoDrinks, setAlcoDrinks] = useState({
        x: '00:00',
        y: Number(0),
        info: "A"
    })
    const [medicationName, setMadicationName] = useState('')
    const [medicationDos, setMadicationDos] = useState('')
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
        z: '00:00',
        info: 'B'
    })
    const [goSleep, setGoSleep] = useState({
        x: '00:00',
        y: Number(0),
        z: '00:00',
        info: 'L'
    }) 
    const [wakeUpTime, setWakeUpTime] = useState({
        x: '00:00',
        y: Number(0),
        z: '00:00',
    })
    const [outOfBed, setOutOfBed] = useState({
        x: '00:00',
        y: Number(0),
        z: '00:00',
        info: 'U'
    })
    const [fallAsleep, setFallAsleep] = useState({
        x: '0',
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
            wakeAfterSleep: Number(0),
            light: Number(0),
            bedTime: Number(0),
            outOfBedTime: Number(0),
            finalWakeUp: Number(0),
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
            week: "Sun",
            data: {}
        },
    ])

    const [weekCount, setWeekCount] = useState([weekDay])
    const [generalWeekData, setGeneralWeekData] = useState([])
    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);
    const [modalVisible, setModalVisible] = useState(false);
    const [starCount, setStarCount] = useState(0)
    const weekData = useRef(null)
    const [weekIndex, setWeekIndex] = useState(0)
    let scrollX = useRef(new Animated.Value(0)).current
    const dayData = {
        fullDate: weekDay[activeIndex].data.fullDate,
        prevDate: moment(new Date(`${moment(weekDay[activeIndex].data.fullDate).format('D MMM YYYY')}`).getTime()).subtract(1, 'days').format('D MMM YYYY'),
        dayInfo,
        prevDayInfo,
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
        medicationName,
        medicationDos,
        coffee,
    }


    const getCurrentHourFormat = async (date) => {
        const is24Hour = await is24HourFormat()
        return console.log(moment(date).format(is24Hour ? 'HH:mm' : 'h:mm A'))
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

    const XStore = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('xData', JSON.stringify(value))
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

    const setFlag = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('flag', JSON.stringify(value))
        } catch (e) {
            // saving error
        }
    }
    const setX = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('x', JSON.stringify(value))
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
    const getXData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('xData')
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

    const getFlag = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('flag')
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            // error reading value
        }
    }
    const getX = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('x')
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
        let flag = await getFlag()

        let dat = await getXData()
        dayDataSave.current = infoDay
        if (flag === null) {
            flag = 0
        }
        if (infoDay === null) {
            reasetData()
            await storeData([])
        }
        let arr = weekCount[weekIndex]
        infoDay !== null && infoDay.map((data, index) => {
            weekCount[weekIndex].map((item, i) => {
                if (moment(data.fullDate).format('ddd') === item.week) {
                    arr[i].data = data
                }
            })
        })
        setWeekDay([...arr])
        if (weekData === null) {
            reasetData()
            let weekNumber = moment(new Date(), "MM-DD-YYYY").week();
            await weekDataStore(weekCount)
            return setFlag(weekNumber)
        }
        let weekNumber = 0
        if (weekData === null) {
            weekNumber = moment(new Date(), "MM-DD-YYYY").week();
        } else {
            weekNumber = moment(moment(weekData[weekData.length - 1][0].data.fullDate), "MM-DD-YYYY").week();
        }
        if (weekData !== null) {
            setWeekCount(weekData)
        }
        // console.log(x, 'sasdsada');
        // console.log(weekData, 'Storege');
        // console.log(weekCount[0][0].data.fullDate);
        // console.log(+flag, '+flag', +weekNumber, '+weekNumber'
        // );
       
        if (weekData !== null && +flag > +weekNumber) {
            let arrWeek = [...weekData, [...arr]]
            setWeekCount([...weekData, [...arr]])
            weekDataStore(arrWeek)
            setFlag(weekNumber)
        };
        // if (dat !== null && x) {
        //     let arrWeek = [...weekData, [...arr]]
        //     setWeekCount([...weekData, [...arr]])
        //     XStore(arrWeek)
        // };

    }

    //------------------------- useEffect ---------------------------------

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            getInfo()
            reasetData()
        });
        return unsubscribe;
    }, [props.navigation]);


    useEffect(() => {
        // console.log(DateFormat.is24HourFormat(), 'DateFormat.is24HourFormat');
        scrollX.addListener(({ value }) => {
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
        reasetData()
        getInfo()
    }, []);




    useEffect(() => {
        weekData.current.scrollToOffset({
            offset: (weekIndex + 1) * Width
        })
    }, [weekCount])


    useEffect(() => {
        let week = new Array();
        (function dates(current) {
            current.setDate((current.getDate() - current.getDay() + (current.getDay() === 0 ? -6 : 1)));
            for (var i = 0; i < 7; i++) {
                week.push(
                    new Date(current)
                );
                current.setDate(current.getDate() + 1);
            }
            return week;
        })(new Date())

        let arr = weekCount[weekIndex]
        week.map(val => {
            arr.map((data, index) => {
                if (data.week === moment(val).format('ddd')) {
                    data.data.fullDate = moment(val).format('dddd, MMM DD, YYYY')
                }
            })
        })

        // let arr = weekCount[weekIndex]
        // if (activeIndex >= 0) {
        //     arr.map((data, index) => {
        //         if (!Object.keys(data.data).length && activeIndex >= index) {
        //             let minus = activeIndex - index
        //             data.data.fullDate = moment().subtract(minus, 'days').format('dddd, MMM DD, YYYY')
        //         }
        //     })
        // }
    }, [weekIndex, activeIndex])

    //------------------------------------------------------------------------------

    //------------------------ Converters--------------------------------
    function convertMtoH(n) {
        let num = n;
        let hours = (num / 60);
        let rhours = Math.floor(hours);
        let minutes = (hours - rhours) * 60;
        let rminutes = Math.round(minutes);
        return num = (rhours < 10 ? '0' + rhours : rhours) + " : " + (rminutes < 10 ? "0" + rminutes : rminutes);
    }

    function convertHtoM(timeInHour) {
        let timeParts = timeInHour.split(":");
        return Number(timeParts[0]) * 60 + Number(timeParts[1]);
    }

    function convertMS(ms) {
        let d, h, m, s;
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

    //-------------------------------------------------------------------


    //------------------------------functions-------------------------------

    const reasetData = () => {
        setTextAreaInput('')
        setAlcoDrinks({
            x: '00:00',
            y: Number(0),
            info: 'A'
        })
        setMadicationName('')
        setMadicationDos('')
        setCoffee({
            x: '00:00',
            y: Number(0),
            info: 'A'
        })
        setDate('')
        setDayInfo('')
        setPrevDayInfo('')
        setExerciseFrom({
            x: "from 00:00",
            y: Number(0)
        })
        setExerciseTo({
            x: "to 00:00",
            y: Number(0)
        })
        setFallAsleep({
            x: '0',
            y: Number(0)
        })
        setGoSleep({
            x: '00:00',
            y: Number(0),
            info: 'L'
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
            y: Number(0),
            z: '00:00',
        })
        setWakeUpFrom({
            x: "to 00:00",
            y: Number(0)
        })
        setWakeUpTime({
            x: '00:00',
            y: Number(0),
            z: '00:00'
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

    const handleAdddata = async () => {
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
        weekDataStore(weekCount)
        setModalVisible(!modalVisible)
        reasetData()
    }

    const handleForward = () => {
        weekData.current.scrollToOffset({
            offset: (weekIndex + 1) * Width
        })
    }

    const handleBackward = () => {
        weekData.current.scrollToOffset({
            offset: (weekIndex - 1) * Width
        })
    }

    // function dates(current) {
    //     let week= new Array();
    //     current.setDate((current.getDate() - current.getDay() +1));
    //     for (var i = 0; i < 7; i++) {
    //         week.push(
    //             new Date(current)
    //         );
    //         current.setDate(current.getDate() +1);
    //     }
    //     return week;
    // }


    //----------------------------------------------------------------------


    //-------------------------------- FlatList randers --------------------------------------------------

    let weekDataRender = ((item, i) => {
        return (
            <Animated.View key={item.index} style={{
                width: Width,
            }}>
                <View style={styles.contentView}>
                    <View>
                        <TouchableOpacity onPress={handleBackward}>
                            <Image source={require('../../assets/img/leftpassive.png')}
                                style={styles.nextPrevBtn} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.week}>Week {item.index + 1}</Text>
                    <View>
                        <TouchableOpacity onPress={handleForward}>
                            <Image source={require('../../assets/img/right.png')} style={styles.nextPrevBtn} />
                        </TouchableOpacity>
                    </View>
                </View>
            </Animated.View>
        )
    })


    //----------------------------------------------------------------------------------------------------


    return (
        loading ?
            <View style={styles.activLoad}>
                <ActivityIndicator size="small" color="#0000ff" />
            </View>
            :
            <ScrollView contentContainerStyle={styles.scrollView}>
                <StatusBar backgroundColor={'#EFEFEF'} barStyle='dark-content' />
                <View style={styles.topSide}>
                    <View style={styles.weekSide}>
                        <View style={{ width: Width }}>
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
                                            contentOffset: { x: scrollX }
                                        }
                                    }],
                                    { useNativeDriver: false }
                                )}
                            />
                        </View>
                    </View>
                    <View style={styles.weekDayName}>
                        {weekCount[weekIndex].map((item, index) => {

                            return (
                                <View key={index}>
                                    <TouchableOpacity onPress={() => {
                                        // reasetData()
                                        (setActiveColor(!activColor),
                                            setActiveIndex(index), reasetData())
                                        // item.data.fullDate < moment().format('dddd, MMM DD, YYYY')
                                        //     ? (setActiveColor(!activColor),
                                        //         setActiveIndex(index), reasetData())
                                        //     :
                                        //     moment().format('d') > index ? (setActiveColor(!activColor),
                                        //         setActiveIndex(index), reasetData())
                                        //         :
                                        //         moment().format('d') == 0 && (setActiveColor(!activColor),
                                        // setActiveIndex(index), reasetData())
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
                                            style={[styles.weeKDaysText, { color: activeIndex === index ? '#FFF' : '#2B91BF' }]}>{item.week}</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        })}
                    </View>
                </View>
                {Object.keys(weekCount[weekIndex][activeIndex].data).length > 1 ?
                    (<View style={styles.content}>
                        <Text style={styles.title}>{weekCount[weekIndex][activeIndex].data.fullDate}</Text>

                        <View style={styles.chooseType}>
                            <Text style={styles.globalText}>Before your last bedtime,what time did you have coffee, cola or tea?</Text>
                            <TouchableOpacity style={styles.dataPicker}>
                                <Text
                                    style={styles.selectText}>{weekCount[weekIndex][activeIndex].data.coffee.x === '00:00' ? 'N/A' : weekCount[weekIndex][activeIndex].data.coffee.x}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.chooseType}>
                            <Text style={styles.globalText}>Before your last bedtime,what time did you have alcoholic drinks?</Text>
                            <TouchableOpacity style={styles.dataPicker}>
                                <Text
                                    style={styles.selectText}>{weekCount[weekIndex][activeIndex].data.alcoDrinks.x === '00:00' ? 'N/A' : weekCount[weekIndex][activeIndex].data.alcoDrinks.x}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.chooseType}>
                            <Text style={styles.globalText}>Before your last bedtime,what time did you exercise?</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View>
                                    <TouchableOpacity style={styles.dataPicker}>
                                        <Text
                                            style={styles.selectText}>{weekCount[weekIndex][activeIndex].data.exerciseFrom.x === 'from 00:00' ? 'N/A' : weekCount[weekIndex][activeIndex].data.exerciseFrom.x} </Text>
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity style={styles.dataPicker}>
                                    <Text
                                        style={styles.selectText}>{weekCount[weekIndex][activeIndex].data.exerciseTo.x === 'to 00:00' ? 'N/A' : weekCount[weekIndex][activeIndex].data.exerciseTo.x}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.chooseType}>
                            <Text style={styles.globalText}>Before your last bedtime,what time did you take a nap?</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View>
                                    <TouchableOpacity style={styles.dataPicker}>
                                        <Text
                                            style={styles.selectText}>{weekCount[weekIndex][activeIndex].data.napFrom.x === 'from 00:00' ? 'N/A' : weekCount[weekIndex][activeIndex].data.napFrom.x}</Text>
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity style={styles.dataPicker}>
                                    <Text
                                        style={styles.selectText}>{weekCount[weekIndex][activeIndex].data.napTo.x === 'to 00:00' ? 'N/A' : weekCount[weekIndex][activeIndex].data.napTo.x}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.chooseType}>
                            <Text style={styles.globalText}>What time did you get to bed?</Text>
                            <TouchableOpacity style={styles.dataPicker}>
                                <Text
                                    style={styles.selectText}>{weekCount[weekIndex][activeIndex].data.intoBed.x === '00:00' ? 'N/A' : weekCount[weekIndex][activeIndex].data.intoBed.x}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.chooseType}>
                            <Text style={styles.globalText}>What time did you turn off the lights to go to sleep?</Text>
                            <TouchableOpacity style={styles.dataPicker}>
                                <Text
                                    style={styles.selectText}>{weekCount[weekIndex][activeIndex].data.goSleep.x === '00:00' ? 'N/A' : weekCount[weekIndex][activeIndex].data.goSleep.x}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.chooseType}>
                            <Text style={styles.globalText}>How long did it take you to fall asleep?</Text>
                            <TouchableOpacity style={styles.dataPicker}>
                                <Text
                                    style={styles.selectText}>{weekCount[weekIndex][activeIndex].data.fallAsleep.x === '0' ? 'N/A' : weekCount[weekIndex][activeIndex].data.fallAsleep.x}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.chooseType}>
                            <Text style={styles.globalText}>During the sleep, what timings did you wake up?</Text>
                            {weekCount[weekIndex][activeIndex].data.addWakeUp.map((item, index) => {
                                return (
                                    <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View>
                                            <TouchableOpacity style={[styles.dataPicker, { marginBottom: 15 }]}>
                                                <Text
                                                    style={styles.selectText}>{item.wakeUpDataFrom.x === 'from 00:00' ? 'N/A' : item.wakeUpDataFrom.x}
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                        <TouchableOpacity style={styles.dataPicker}>
                                            <Text
                                                style={styles.selectText}>{item.wakeUpDataTo.x === 'to 00:00' ? 'N/A' : item.wakeUpDataTo.x}</Text>
                                        </TouchableOpacity>
                                    </View>)
                            })}
                            <View style={styles.addForm}>
                                <TouchableOpacity>
                                    <Image source={require('../../assets/img/add.png')} style={styles.addFormImg} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.chooseType}>
                            <Text style={styles.globalText}>What was your final wake up time?</Text>
                            <TouchableOpacity style={styles.dataPicker}>
                                <Text
                                    style={styles.selectText}>{weekCount[weekIndex][activeIndex].data.wakeUpTime.x === '00:00' ? 'N/A' : weekCount[weekIndex][activeIndex].data.wakeUpTime.x}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.chooseType}>
                            <Text style={styles.globalText}>What time did you get out of bed?</Text>
                            <TouchableOpacity style={styles.dataPicker}>
                                <Text
                                    style={styles.selectText}>{weekCount[weekIndex][activeIndex].data.outOfBed.x === '00:00' ? 'N/A' : weekCount[weekIndex][activeIndex].data.outOfBed.x}</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.chooseType}>
                            <Text style={styles.globalText}>What type of day is {weekCount[weekIndex][activeIndex].data.fullDate}?</Text>
                            <TouchableOpacity style={styles.dataPicker}>
                                <Text style={styles.selectText}>{weekCount[weekIndex][activeIndex].data.dayInfo}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.chooseType}>
                            <Text style={styles.globalText}>Sleep Medications</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <TextInput
                                    editable={false}
                                    value={weekCount[weekIndex][activeIndex].data.medicationName}
                                    style={styles.medicationName}
                                />
                                <TextInput
                                    editable={false}
                                    value={weekCount[weekIndex][activeIndex].data.medicationDos}
                                    style={styles.medicationDosage}
                                />
                            </View>
                        </View>
                        <View style={styles.chooseType}>
                            <Text style={styles.globalText}>Comments</Text>
                            <TextInput
                                editable={false}
                                style={styles.textArea}
                                multiline={true}
                                value={weekCount[weekIndex][activeIndex].data.textAreaInput}
                            />
                        </View>
                        {weekCount[weekIndex].map((item, index) => {
                            if (index === activeIndex) {
                                return (<AcceptButton key={index} handleCount={() => {
                                    // alert(`${item.week}`)
                                    // setModalVisible(!modalVisible);
                                }} />)
                            }
                        })}
                    </View>)
                    :
                    <View style={styles.content}>
                        <Text style={styles.title}>{weekCount[weekIndex][activeIndex].data.fullDate}</Text>
                        <View style={styles.chooseType}>
                            <Text style={styles.globalText}>Before your last bedtime,what time did you have coffee, cola or tea?</Text>
                            <TouchableOpacity style={styles.dataPicker} onPress={() => setOpenCoffee(true)}>
                                <Text style={styles.selectText}>{coffee.x}</Text>
                            </TouchableOpacity>
                            <DatePicker
                                minuteInterval={5}
                                is24hourSource={'device'}
                                modal
                                mode={'datetime'}
                                open={openCoffee}
                                date={new Date(moment(weekCount[weekIndex][activeIndex].data.fullDate).subtract(1, 'days').toString())}
                                onConfirm={async (time) => {
                                    const is24Hour = await is24HourFormat()

                                    setOpenCoffee(false)
                                    setCoffee({
                                        x: moment().format(is24Hour ? 'HH:mm' : 'hh:mm A'),
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
                            <Text style={styles.globalText}>Before your last bedtime,what time did you have alcoholic drinks?</Text>
                            <TouchableOpacity style={styles.dataPicker} onPress={() => setOpenAlco(true)}>
                                <Text style={styles.selectText}>{alcoDrinks.x}</Text>
                            </TouchableOpacity>
                            <DatePicker
                                minuteInterval={5}
                                is24hourSource={'device'}
                                modal
                                mode={'datetime'}
                                open={openAlco}
                                date={new Date(moment(weekCount[weekIndex][activeIndex].data.fullDate).subtract(1, 'days').toString())}
                                onConfirm={async (time) => {
                                    const is24Hour = await is24HourFormat()
                                    setOpenAlco(false)
                                    setAlcoDrinks({
                                        x: moment(time).format(is24Hour ? 'HH:mm' : 'hh:mm A'),
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
                            <Text style={styles.globalText}>Before your last bedtime,what time did you exercise?</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View>
                                    <TouchableOpacity style={styles.dataPicker} onPress={() => setOpenExFrom(true)}>
                                        <Text style={styles.selectText}>{exerciseFrom.x}</Text>
                                    </TouchableOpacity>
                                    <DatePicker
                                        minuteInterval={5}
                                        is24hourSource={'device'}
                                        modal
                                        mode={'datetime'}
                                        open={openExFrom}
                                        date={new Date(moment(weekCount[weekIndex][activeIndex].data.fullDate).subtract(1, 'days').toString())}
                                        onConfirm={async (time) => {
                                            const is24Hour = await is24HourFormat()
                                            setOpenExFrom(false)
                                            setExerciseFrom({
                                                x: moment(time).format(is24Hour ? 'HH:mm' : 'hh:mm A'),
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
                                minuteInterval={5}
                                is24hourSource={'device'}
                                modal
                                mode={'datetime'}
                                open={openExTo}
                                date={new Date(moment(weekCount[weekIndex][activeIndex].data.fullDate).subtract(1, 'days').toString())}
                                onConfirm={async (time) => {
                                    const is24Hour = await is24HourFormat()
                                    setOpenExTo(false)
                                    setExerciseTo({
                                        x: moment(time).format(is24Hour ? 'HH:mm' : 'hh:mm A'),
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
                            <Text style={styles.globalText}>Before your last bedtime,what time did you take a nap?</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View>
                                    <TouchableOpacity style={styles.dataPicker} onPress={() => setOpenNapFrom(true)}>
                                        <Text style={styles.selectText}>{napFrom.x}</Text>
                                    </TouchableOpacity>
                                    <DatePicker
                                        minuteInterval={5}
                                        is24hourSource={'device'}
                                        modal
                                        mode={'datetime'}
                                        open={openNapFrom}
                                        date={new Date(moment(weekCount[weekIndex][activeIndex].data.fullDate).subtract(1, 'days').toString())}
                                        onConfirm={async (time) => {
                                            const is24Hour = await is24HourFormat()
                                            setOpenNapFrom(false)
                                            setNapFrom({
                                                x: moment(time).format(is24Hour ? 'HH:mm' : 'hh:mm A'),
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
                                minuteInterval={5}
                                is24hourSource={'device'}
                                modal
                                mode={'datetime'}
                                open={openNapTo}
                                date={new Date(moment(weekCount[weekIndex][activeIndex].data.fullDate).subtract(1, 'days').toString())}
                                onConfirm={async (time) => {
                                    const is24Hour = await is24HourFormat()
                                    setOpenNapTo(false)
                                    setNapTo({
                                        x: moment(time).format(is24Hour ? 'HH:mm' : 'hh:mm A'),
                                        y: new Date(time).getTime()
                                    })
                                }}
                                onCancel={() => {
                                    setOpenNapTo(false)
                                }}
                            />
                        </View>
                        <View style={styles.chooseType}>
                            <Text style={styles.globalText}>What time did you get to bed?</Text>
                            <TouchableOpacity style={styles.dataPicker} onPress={() => setOpenIntoBed(true)}>
                                <Text style={styles.selectText}>{intoBed.x}</Text>
                            </TouchableOpacity>
                            <DatePicker
                                minuteInterval={5}
                                is24hourSource={'device'}
                                modal
                                mode={'datetime'}
                                open={openIntoBed}
                                date={new Date(weekCount[weekIndex][activeIndex].data.fullDate)}
                                onConfirm={async (time) => {
                                    const is24Hour = await is24HourFormat()
                                    setOpenIntoBed(false)
                                    setIntoBed({
                                        x: moment(time).format(is24Hour ? 'HH:mm' : 'hh:mm A'),
                                        y: new Date(time).getTime(),
                                        z: moment(time).format('hh:mm'),
                                        info: "B"
                                    })
                                }}
                                onCancel={() => {
                                    setOpenIntoBed(false)
                                }}
                            />
                        </View>
                        <View style={styles.chooseType}>
                            <Text style={styles.globalText}>What time did you turn off the lights to go to sleep?</Text>
                            <TouchableOpacity style={styles.dataPicker} onPress={() => setOpenGoSleep(true)}>
                                <Text style={styles.selectText}>{goSleep.x}</Text>
                            </TouchableOpacity>
                            <DatePicker
                                minuteInterval={5}
                                is24hourSource={'device'}
                                modal
                                mode={'datetime'}
                                open={openGoSleep}
                                date={new Date(weekCount[weekIndex][activeIndex].data.fullDate)}
                                onConfirm={async (time) => {
                                    setOpenGoSleep(false)
                                    const is24Hour = await is24HourFormat()
                                    setGoSleep({

                                        x: moment(time).format(is24Hour ? 'HH:mm' : 'hh:mm A'),
                                        y: new Date(time).getTime(),
                                        z: moment(time).format('hh:mm'),
                                        info: 'L'
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
                                    <View key={index} style={{ marginVertical: 10 }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
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
                                    <Image source={require('../../assets/img/add.png')} style={styles.addFormImg} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.chooseType}>
                            <Text style={styles.globalText}>What was your final wake up time?</Text>
                            <TouchableOpacity style={styles.dataPicker} onPress={() => setOpenWakeUpTime(true)}>
                                <Text style={styles.selectText}>{wakeUpTime.x}</Text>
                            </TouchableOpacity>
                            <DatePicker
                                minuteInterval={5}
                                is24hourSource={'device'}
                                modal
                                mode={'datetime'}
                                open={openWakeUpTime}
                                date={weekDay[activeIndex].data.fullDate ? new Date(weekDay[activeIndex].data.fullDate) : new Date()}
                                onConfirm={async (time) => {
                                    const is24Hour = await is24HourFormat()
                                    setOpenWakeUpTime(false)
                                    setWakeUpTime({
                                        x: moment(time).format(is24Hour ? 'HH:mm' : 'hh:mm A'),
                                        y: new Date(time).getTime(),
                                        z: moment(time).format('hh:mm'),
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
                                minuteInterval={5}
                                is24hourSource={'device'}
                                modal
                                mode={'datetime'}
                                open={openOutOfBed}
                                date={new Date(weekCount[weekIndex][activeIndex].data.fullDate)}
                                onConfirm={async (time) => {
                                    const is24Hour = await is24HourFormat()
                                    setOpenOutOfBed(false)
                                    setOutOfBed({
                                        x: moment(time).format(is24Hour ? 'HH:mm' : 'hh:mm A'),
                                        y: new Date(time).getTime(),
                                        z: moment(time).format('hh:mm'),
                                        info: "U"
                                    })
                                }}
                                onCancel={() => {
                                    setOpenOutOfBed(false)
                                }}
                            />
                        </View>

                        <View style={styles.chooseType}>
                            <Text style={styles.globalText}>What type of day is {`${moment(weekCount[weekIndex][activeIndex].data.fullDate).format('D MMM YYYY')}`}?</Text>
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
                                    style={styles.iconStyle} />}
                            />
                        </View>
                        <View style={styles.chooseType}>
                            <Text style={styles.globalText}>Sleep Medications</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <TextInput
                                    style={styles.medicationName}
                                    placeholder="Enter Name"
                                    placeholderTextColor={'#e1e1e1'}
                                    onChangeText={(e) => setMadicationName(e)}
                                />
                                <TextInput
                                    style={styles.medicationDosage}
                                    placeholder="Enter Dosage"
                                    placeholderTextColor={'#e1e1e1'}
                                    onChangeText={(e) => setMadicationDos(e)}
                                />
                            </View>
                        </View>
                        <View style={styles.chooseType}>
                            <Text style={styles.globalText}>Comments</Text>
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
                            let sleepTime = convertHtoM(convertMS(wakeUpTime.y - (fallAsleep.y * 60000 + goSleep.y))) - addWakeUp.map((item) => convertHtoM(convertMS(item.wakeUpDataTo.y - item.wakeUpDataFrom.y))).reduce(
                                (previousValue, currentValue) => previousValue + currentValue,
                                0)
                            let timeInBed = convertHtoM(convertMS(outOfBed.y - intoBed.y))
                            let effective = Math.floor((sleepTime / timeInBed) * 100)
                            let awakenings = addWakeUp.map((item) => convertHtoM(convertMS(item.wakeUpDataTo.y - item.wakeUpDataFrom.y))).reduce(
                                (previousValue, currentValue) => previousValue + currentValue,
                                0)
                            let naps = convertHtoM(convertMS(napTo.y - napFrom.y))
                            let fallaSleepTime = fallAsleep.y
                            let wakeAfterSleep = convertHtoM(convertMS((addWakeUp[0].wakeUpDataFrom.y > 0) && (addWakeUp[0].wakeUpDataFrom.y - ((fallAsleep.y * 60000) + intoBed.y))))
                            let light = goSleep.z
                            let bedTime = intoBed.z
                            let outOfBedTime = outOfBed.z
                            let finalWakeUp = wakeUpTime.z

                            setResults([{
                                sleepTime,
                                timeInBed,
                                effective,
                                awakenings,
                                naps,
                                fallaSleepTime,
                                wakeAfterSleep,
                                light,
                                bedTime,
                                outOfBedTime,
                                finalWakeUp,
                                data: moment(weekDay[activeIndex].data.fullDate).format('YYYY-MMM-D')
                            }])
                            setModalVisible(!modalVisible)
                        }} />
                    </View>
                }
                <DataPickerGlobal
                    showHide={showHide}
                    open={openWakeUpFrom}
                    date={new Date(weekCount[weekIndex][activeIndex].data.fullDate)}
                    confirm={async (time) => {
                        const is24Hour = await is24HourFormat()
                        setShowHide(false)
                        let data = addWakeUp;
                        data[openDataTime.index][openDataTime.type] = {
                            x: moment(time).format(is24Hour ? 'HH:mm' : 'hh:mm A'),
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
                                starStyle={{ marginTop: 16 }}
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
                                }} />
                                <Text style={{ marginLeft: 15, color: '#00405E' }}>min</Text>
                            </View>
                            <View style={styles.btnModal}>
                                <View style={{ marginRight: 40 }}>
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

