import { View, ScrollView, StatusBar, Image, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import styles from './style';
import DatePicker from 'react-native-date-picker'
import moment from 'moment';
import { GlobalButton, AcceptButton, DataPickerGlobal } from '../../component';
import SelectDropdown from 'react-native-select-dropdown'
import AsyncStorage from '@react-native-async-storage/async-storage';

export function AddInfo(props) {
    const [activeIndex, setActiveIndex] = useState((Number(moment().format('d')) - 1))
    const [activColor, setActiveColor] = useState(false)
    const [dayInfo, setDayInfo] = useState()
    const [date, setDate] = useState('00:00')
    const [openAlco, setOpenAlco] = useState(false)
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
    const [alcoDrinks, setAlcoDrinks] = useState({
        x: '00:00',
        y: ""
    })
    const [exerciseFrom, setExerciseFrom] = useState({
        x: "from 00:00",
        y: ""
    })
    const [exerciseTo, setExerciseTo] = useState({
        x: "to 00:00",
        y: " "
    })
    const [napFrom, setNapFrom] = useState({
        x: "from 00:00",
        y: " "
    })
    const [napTo, setNapTo] = useState({
        x: "to 00:00",
        y: " "
    })
    const [intoBed, setIntoBed] = useState({
        x: '00:00',
        y: " "
    })
    const [goSleep, setGoSleep] = useState({
        x: '00:00',
        y: " "
    })
    const [wakeUpTime, setWakeUpTime] = useState({
        x: '00:00',
        y: Number(0)
    })
    const [outOfBed, setOutOfBed] = useState({
        x: '00:00',
        y: " "
    })
    const [fallAsleep, setFallAsleep] = useState({
        x: '00:00',
        y: " "
    })
    const [wakeUpFrom, setWakeUpFrom] = useState({
        x: "to 00:00",
        y: " "
    })
    const [wakeUpTo, setWakeUpTo] = useState({
        x: "to 00:00",
        y: " "
    })
    const [medInput, setMedInput] = useState('')
    const [textAreaInput, setTextAreaInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [weekCountIndex, setWeekCountIndex] = useState(0)
    const [allData, setAllData] = useState([])
    const dayDataSave = useRef([])
    const [activeLeft, setActiveLeft] = useState(true)
    const [activeRight, setActiveRight] = useState(true)
    const [addWakeUp, setAddWakeUp] = useState([{
        wakeUpDataFrom: 'from 00:00',
        wakeUpDataTo: 'to 00:00',
    }])
    const countries = ["Work", "School", "Day off", "Vacation"]
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
            week: "Sat",
            data: {}
        },
    ])
    const [weekCount, setWeekCount] = useState(weekDay)
    console.log(addWakeUp);

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


    // console.log(convertMS(exerciseFrom.y - alcoDrinks.y), 'ffffffwwwwwwwwwwwwwwww');
    // console.log(weekDay[activeIndex].data.exerciseFrom.y);
    // console.log(convertMS(weekDay[activeIndex].data.exerciseFrom.y - weekDay[activeIndex].data.alcoDrinks.y), 'ffffffwwwwwwwwwwwwwwww');

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
        medInput,
        textAreaInput,
        loading
    }



    const storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('days', JSON.stringify(value))
        } catch (e) {
            // saving error
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
        let infoDay = await getData()
        dayDataSave.current = infoDay
        if (infoDay === null) {
            await storeData([])
        }
        let arr = weekDay
        infoDay.map((data, index) => {
            weekDay.map((item, i) => {
                if (moment(data.fullDate).format('ddd') === item.week) {
                    arr[i].data = data
                }
            })
        })
        setWeekDay([...arr])
    }
    useEffect(() => {
        getInfo()
    }, []);

    useEffect(() => {
        moment().format('ddd') === "Thu" ? setWeekCount([weekCount, weekDay]) : null
        weekDay.map((data, index) => {
            if (moment().format('ddd') === data.week) {
                setActiveIndex(index)
            }
        })
    }, [])

    useEffect(() => {
        let arr = weekDay
        if (activeIndex !== 0) {
            arr.map((data, index) => {
                if (!Object.keys(data.data).length && activeIndex >= index) {
                    let minus = activeIndex - index
                    data.data.fullDate = moment().subtract(minus, 'days').format('dddd, MMM DD, YYYY')
                }
            })
        }
    }, [activeIndex])


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
        let arr = weekDay
        arr[activeIndex].data = dayData
        setWeekDay([...arr])
        setTextAreaInput('')
        setAlcoDrinks({
            x: '00:00',
            y: ""
        })
        setDate('')
        setDayInfo('')
        setExerciseFrom({
            x: "from 00:00",
            y: ""
        })
        setExerciseTo({
            x: "to 00:00",
            y: " "
        })
        setFallAsleep({
            x: '00:00',
            y: " "
        })
        setGoSleep({
            x: '00:00',
            y: " "
        })
        setIntoBed({
            x: '00:00',
            y: " "
        })
        setMedInput('')
        setNapFrom({
            x: "from 00:00",
            y: " "
        })
        setNapTo({
            x: "to 00:00",
            y: " "
        })
        setOutOfBed({
            x: '00:00',
            y: " "
        })
        setWakeUpFrom({
            x: "to 00:00",
            y: " "
        })
        setWakeUpTime({
            x: '00:00',
            y: Number(0)
        })
        setWakeUpTo({
            x: "to 00:00",
            y: " "
        })
    }
    // console.log(dayDataSave.current, 'alllllll');
    // console.log(weekCount);

    function convertMtoH(n) {
        var num = n;
        var hours = (num / 60);
        var rhours = Math.floor(hours);
        var minutes = (hours - rhours) * 60;
        var rminutes = Math.round(minutes);
        return num = rhours + " : " + rminutes;
    }

    function convertHtoM(timeInHour) {
        var timeParts = timeInHour.split(":");
        return Number(timeParts[0]) * 60 + Number(timeParts[1]);
    }

    console.log(weekDay);
    // console.log(dayDataSave.current[0].wakeUpFrom.y-dayDataSave.current[0].alcoDrinks.y);
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
                        <View>
                            <TouchableOpacity>
                                <Image source={require('../../assets/img/leftpassive.png')}
                                    style={{ width: 10, height: 15 }} />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.week}>Week 1</Text>
                        <View>
                            <TouchableOpacity>
                                <Image source={require('../../assets/img/right.png')} style={{ width: 10, height: 15 }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.weekDayName}>
                        {weekDay.map((item, index) => {
                            return (
                                <View key={index}>
                                    <TouchableOpacity onPress={() => {
                                        setAddWakeUp([...[{
                                            wakeUpDataFrom: 'from 00:00',
                                            wakeUpDataTo: 'to 00:00',
                                        }]])
                                        moment().format('d') > index ? (setActiveColor(!activColor),
                                            setActiveIndex(index)) : null
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
                {Object.keys(weekDay[activeIndex].data).length > 1 ?
                    <View style={styles.content}>
                        <Text style={styles.title}>{weekDay[activeIndex].data.fullDate}</Text>
                        <View style={styles.chooseType}>
                            <Text style={styles.globalText}>Is this a Work/ School/ Day off/ Vacation?</Text>
                            <TouchableOpacity style={styles.dataPicker}  >
                                <Text style={styles.selectText}>{weekDay[activeIndex].data.dayInfo}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.chooseType}>
                            <Text style={styles.globalText}>What time did you last have alcoholic drinks?</Text>
                            <TouchableOpacity style={styles.dataPicker} >
                                <Text style={styles.selectText}>{weekDay[activeIndex].data.alcoDrinks.x}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.chooseType}>
                            <Text style={styles.globalText}>What time did you last exercise?</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View>
                                    <TouchableOpacity style={styles.dataPicker}  >
                                        <Text style={styles.selectText}>{weekDay[activeIndex].data.exerciseFrom.x}</Text>
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity style={styles.dataPicker}  >
                                    <Text style={styles.selectText}>{weekDay[activeIndex].data.exerciseTo.x}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.chooseType}>
                            <Text style={styles.globalText}>What time did you last take a nap?</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View>
                                    <TouchableOpacity style={styles.dataPicker} >
                                        <Text style={styles.selectText}>{weekDay[activeIndex].data.napFrom.x}</Text>
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity style={styles.dataPicker} >
                                    <Text style={styles.selectText}>{weekDay[activeIndex].data.napTo.x}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.chooseType}>
                            <Text style={styles.globalText}>What time did you get into bed?</Text>
                            <TouchableOpacity style={styles.dataPicker} >
                                <Text style={styles.selectText}>{weekDay[activeIndex].data.intoBed.x}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.chooseType}>
                            <Text style={styles.globalText}>What time did you turn off the lights to go sleep?</Text>
                            <TouchableOpacity style={styles.dataPicker} >
                                <Text style={styles.selectText}>{weekDay[activeIndex].data.goSleep.x}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.chooseType}>
                            <Text style={styles.globalText}>How long did it take you to fall asleep?</Text>
                            <TouchableOpacity style={styles.dataPicker} >
                                <Text style={styles.selectText}>{weekDay[activeIndex].data.fallAsleep.x}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.chooseType}>
                            <Text style={styles.globalText}>During the sleep, what timings did you wake up?</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View>
                                    <TouchableOpacity style={styles.dataPicker} >
                                        <Text style={styles.selectText}>{weekDay[activeIndex].data.wakeUpFrom.x}</Text>
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity style={styles.dataPicker} >
                                    <Text style={styles.selectText}>{weekDay[activeIndex].data.wakeUpTo.x}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.addForm}>
                                <TouchableOpacity>
                                    <Image source={require('../../assets/img/add.png')} style={styles.addFormImg} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.chooseType}>
                            <Text style={styles.globalText}>What was your final wake up time?</Text>
                            <TouchableOpacity style={styles.dataPicker} >
                                <Text style={styles.selectText}>{weekDay[activeIndex].data.wakeUpTime.x}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.chooseType}>
                            <Text style={styles.globalText}>What time did you get out of bed?</Text>
                            <TouchableOpacity style={styles.dataPicker}>
                                <Text style={styles.selectText}>{weekDay[activeIndex].data.outOfBed.x}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.chooseType}>
                            <Text style={styles.globalText}>Sleep medications</Text>
                            <View style={{ position: 'relative', width: 166, height: 35 }}>
                                <TextInput
                                    style={styles.inputStyle}
                                    editable={false}
                                    numberOfLines={1}
                                    value={weekDay[activeIndex].data.medInput}
                                    onChangeText={(e) => setMedInput(e)}
                                />
                            </View>
                        </View>
                        <View style={styles.chooseType}>
                            <Text style={styles.globalText}>Sleep medications</Text>
                            <TextInput
                                placeholderTextColor={'#2B91BF'}
                                editable={false}
                                style={styles.textArea}
                                numberOfLines={6}
                                multiline={true}
                                value={weekDay[activeIndex].data.textAreaInput}
                                onChangeText={(e) => setTextAreaInput(e)}
                            />
                        </View>
                        {weekDay.map((item, index) => {
                            if (index === activeIndex) {
                                return (<AcceptButton key={index} handleCount={() => {
                                    alert(`${item.week}`)
                                    console.log(convertMS(weekDay[activeIndex].data.exerciseFrom.y - weekDay[activeIndex].data.alcoDrinks.y))
                                }} />)
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
                                    style={styles.iconStyle} />}
                            />
                        </View>
                        <View style={styles.chooseType}>
                            <Text style={styles.globalText}>What time did you last have alcoholic drinks?</Text>
                            <TouchableOpacity style={styles.dataPicker} onPress={() => setOpenAlco(true)}>
                                <Text style={styles.selectText}>{alcoDrinks.x}</Text>
                            </TouchableOpacity>
                            <DatePicker
                                is24hourSource={'device'}
                                modal
                                mode={'datetime'}
                                open={openAlco}
                                date={new Date()}
                                onConfirm={(time) => {
                                    setOpenAlco(false)
                                    console.log(new Date(time), 'rrr');
                                    setAlcoDrinks({
                                        x: moment(time).format('hh:mm A'),
                                        y: new Date(time).getTime()
                                    })
                                }}
                                onCancel={() => {
                                    setOpenAlco(false)
                                }}
                            />
                        </View>
                        <View style={styles.chooseType}>
                            <Text style={styles.globalText}>What time did you last exercise?</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View>
                                    <TouchableOpacity style={styles.dataPicker} onPress={() => setOpenExFrom(true)}>
                                        <Text style={styles.selectText}>{exerciseFrom.x}</Text>
                                    </TouchableOpacity>
                                    <DatePicker
                                        is24hourSource={'device'}
                                        modal
                                        mode={'datetime'}
                                        open={openExFrom}
                                        date={new Date()}
                                        onConfirm={(time) => {
                                            setOpenExFrom(false)
                                            console.log(new Date(time), 'cccc');
                                            setExerciseFrom({
                                                x: moment(time).format('hh:mm A'),
                                                y: new Date(time).getTime()
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
                                modal
                                mode={'datetime'}
                                open={openExTo}
                                date={new Date()}
                                onConfirm={(time) => {
                                    setOpenExTo(false)
                                    setExerciseTo({
                                        x: moment(time).format('hh:mm A'),
                                        y: new Date(time).getTime()
                                    })
                                }}
                                onCancel={() => {
                                    setOpenExTo(false)
                                }}
                            />
                        </View>
                        <View style={styles.chooseType}>
                            <Text style={styles.globalText}>What time did you last take a nap?</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View>
                                    <TouchableOpacity style={styles.dataPicker} onPress={() => setOpenNapFrom(true)}>
                                        <Text style={styles.selectText}>{napFrom.x}</Text>
                                    </TouchableOpacity>
                                    <DatePicker
                                        is24hourSource={'device'}
                                        modal
                                        mode={'datetime'}
                                        open={openNapFrom}
                                        date={new Date()}
                                        onConfirm={(time) => {
                                            setOpenNapFrom(false)
                                            setNapFrom({
                                                x: moment(time).format('hh:mm A'),
                                                y: new Date(time).getTime()
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
                                modal
                                mode={'datetime'}
                                open={openNapTo}
                                date={new Date()}
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
                                modal
                                mode={'datetime'}
                                open={openIntoBed}
                                date={new Date()}
                                onConfirm={(time) => {
                                    setOpenIntoBed(false)
                                    setIntoBed({
                                        x: moment(time).format('hh:mm A'),
                                        y: new Date(time).getTime()
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
                                modal
                                mode={'datetime'}
                                open={openGoSleep}
                                date={new Date()}
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
                            <DatePicker
                                is24hourSource={'device'}
                                modal
                                mode={'datetime'}
                                open={openFallAsleep}
                                date={new Date()}
                                onConfirm={(time) => {
                                    setOpenFallAsleep(false)
                                    setFallAsleep({
                                        x: moment(time).format('hh:mm A'),
                                        y: new Date(time).getTime()
                                    })
                                }}
                                onCancel={() => {
                                    setOpenFallAsleep(false)
                                }}
                            />
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
                                                    <Text style={styles.selectText}>{item.wakeUpDataFrom}</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <TouchableOpacity style={styles.dataPicker} onPress={() => {
                                                setOpenDataTime({
                                                    type: 'wakeUpDataTo',
                                                    index: index
                                                })
                                                setShowHide(true)
                                            }}>
                                                <Text style={styles.selectText}>{item.wakeUpDataTo}</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <DataPickerGlobal
                                                    open={openWakeUpTo}
                                                    confirm={(time) => {
                                                        let data = [...addWakeUp];
                                                        data[index].wakeUpDataTo = moment(time).format('HH:mm');
                                                        setAddWakeUp([...data]);
                                                    }}
                                                    cancel={() => {

                                                    }}
                                                />
                                    </View>
                                )
                            })}
                            <View style={styles.addForm}>
                                <TouchableOpacity onPress={() => {
                                    let obj = {
                                        wakeUpDataFrom: 'from 00:00',
                                        wakeUpDataTo: 'to 00:00',
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
                                is24hourSource={'device'}
                                modal
                                mode={'datetime'}
                                open={openWakeUpTime}
                                date={new Date()}
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
                                modal
                                mode={'datetime'}
                                open={openOutOfBed}
                                date={new Date()}
                                onConfirm={(time) => {
                                    setOpenOutOfBed(false)
                                    setOutOfBed({
                                        x: moment(time).format('hh:mm A'),
                                        y: new Date(time).getTime()
                                    })
                                }}
                                onCancel={() => {
                                    setOpenOutOfBed(false)
                                }}
                            />
                        </View>
                        <View style={styles.chooseType}>
                            <Text style={styles.globalText}>Sleep medications</Text>
                            <View style={{ position: 'relative', width: 166, height: 35 }}>
                                <TextInput
                                    style={styles.inputStyle}
                                    numberOfLines={1}
                                    value={medInput}
                                    onChangeText={(e) => setMedInput(e)}
                                />
                            </View>
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
                        <GlobalButton text={'Save'} handlePress={handleAdddata} />
                    </View>
                }
                <DataPickerGlobal
                    showHide={showHide}
                    open={openWakeUpFrom}
                    confirm={(time) => {
                        console.log(time);
                        setShowHide(false)
                        let data = addWakeUp;
                        data[openDataTime.index][openDataTime.type] = moment(time).format('hh:mm A');
                        console.log(data);
                         setAddWakeUp([...data]);
                    }}
                    cancel={() => {
                        setShowHide(false)
                        setOpenDataTime(null)
                    }}
                />
``            </ScrollView>
    );
}
