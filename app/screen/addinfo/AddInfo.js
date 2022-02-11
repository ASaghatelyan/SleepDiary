import {View, ScrollView, StatusBar, Image, Text, TextInput, TouchableOpacity, ActivityIndicator} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import styles from './style';
import DatePicker from 'react-native-date-picker'
import moment from 'moment';
import {GlobalButton, AcceptButton} from '../../component';
import SelectDropdown from 'react-native-select-dropdown'
import AsyncStorage from '@react-native-async-storage/async-storage';

export function AddInfo(props) {
    const [activeIndex, setActiveIndex] = useState(0)
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
    const [openWakeUpTo, setOpenWakeUpTo] = useState(false)
    const [openWakeUpTime, setOpenWakeUpTime] = useState(false)
    const [openOutOfBed, setOpenOutOfBed] = useState(false)
    const [alcoDrinks, setAlcoDrinks] = useState('00:00')
    const [exerciseFrom, setExerciseFrom] = useState("from 00:00")
    const [exerciseTo, setExerciseTo] = useState("to 00:00")
    const [napFrom, setNapFrom] = useState("from 00:00")
    const [napTo, setNapTo] = useState("to 00:00")
    const [intoBed, setIntoBed] = useState("00:00")
    const [goSleep, setGoSleep] = useState("00:00")
    const [wakeUpTime, setWakeUpTime] = useState("00:00")
    const [outOfBed, setOutOfBed] = useState("00:00")
    const [fallAsleep, setFallAsleep] = useState("00:00")
    const [wakeUpFrom, setWakeUpFrom] = useState("from 00:00")
    const [wakeUpTo, setWakeUpTo] = useState("to 00:00")
    const [medInput, setMedInput] = useState('')
    const [textAreaInput, setTextAreaInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [saveData, setSaveData] = useState('')
    const [allData, setAllData] = useState([])
    const dayDataSave = useRef([])
    const [activeLeft, setActiveLeft] = useState(true)
    const [activeRight, setActiveRight] = useState(true)
    const [acceptBtn, setAcceptBtn] = useState(false)
    const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "San"]
    const countries = ["Work", "School", "Day off", "Vacation"]
    const [week1, setWeek1] = useState([
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
        ]
    )

    let dayData = {
        fullDate : week1[activeIndex].data.fullDate,
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


    useEffect(() => {
        week1.map((data, index) => {
            if(moment().format('ddd') === data.week){
                setActiveIndex(index)
            }
        })
    }, [])


    useEffect(() => {
        let arr = week1
        if(activeIndex !== 0){
            arr.map((data, index) => {
                if(!Object.keys(data.data).length && activeIndex >= index){
                    let minus = activeIndex - index
                    data.data.fullDate = moment().subtract(minus, 'days').format('dddd, MMM DD, YYYY')
                }
            })
        }

    }, [activeIndex])
    console.log(week1);


    const storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('days', JSON.stringify(value))
        } catch (e) {
            // saving error
        }
    }

    const loadData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('load', JSON.stringify(true))
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

    const getLoadData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('load')
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            // error reading value
        }
    }


    useEffect(() => {
        getInfo()
    }, [dayDataSave.current]);


    let getInfo = async () => {
        let infoDay = await getData() 
        if (infoDay === null) {
            storeData([])
        }
        let arr = week1
        infoDay.map((data, index) =>{
            week1.map((item, i) => {
                if(moment(data.fullDate).format('ddd') === item.week){
                    arr[i].data = data
                }
            })
        } )
        setWeek1([...arr])
    }

    let handleAdddata = async () => {
        loadData(true)
        setLoading(true)
        let infoDay = await getData()
        let loadingData = await loadData()
        setAllData(infoDay)
        let time = setTimeout(() => {
            dayDataSave.current = infoDay
            storeData([...infoDay, dayData])
            setLoading(false)
            setAcceptBtn(true)
            clearTimeout(time)
        }, 1500);
        let arr = week1
        arr[activeIndex].data = dayData
        setWeek1([...arr])
        setTextAreaInput('')
        ///anel

    }

    useEffect(() => {

    }, [dayDataSave])

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
                        <View>
                            <TouchableOpacity>
                                <Image source={require('../../assets/img/leftpassive.png')}
                                       style={{width: 10, height: 15}}/>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.week}>Week 1</Text>
                        <View>
                            <TouchableOpacity>
                                <Image source={require('../../assets/img/right.png')} style={{width: 10, height: 15}}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.weekDayName}>
                        {week1.map((item, index) => {
                            return (
                                    <View>
                                        <TouchableOpacity onPress={() => {
                                            moment().format('d') > index ? (setActiveColor(!activColor),
                                                setActiveIndex(index),
                                                console.log(index)) : null
                                        }
                                        }
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

                {Object.keys(week1[activeIndex].data).length > 1 ?
                    <View style={styles.content}>
                        <Text style={styles.title}>{week1[activeIndex].data.fullDate}</Text>
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
                            <Text style={styles.globalText}>What time did you last have alcoholic drinks?</Text>
                            <TouchableOpacity style={styles.dataPicker} onPress={() => setOpenAlco(true)}>
                                <Text style={styles.selectText}>{alcoDrinks}</Text>
                            </TouchableOpacity>
                            <DatePicker

                                modal
                                mode={'time'}
                                open={openAlco}
                                date={new Date()}
                                onConfirm={(time) => {
                                    setOpenAlco(false)
                                    setAlcoDrinks(moment(time).format('HH:mm'))
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
                                        <Text style={styles.selectText}>{exerciseFrom}</Text>
                                    </TouchableOpacity>
                                    <DatePicker
                                        modal
                                        mode={'time'}
                                        open={openExFrom}
                                        date={new Date()}
                                        onConfirm={(time) => {
                                            setOpenExFrom(false)
                                            setExerciseFrom(moment(time).format('HH:mm'))
                                        }}
                                        onCancel={() => {
                                            setOpenExFrom(false)
                                        }}
                                    />
                                </View>
                                <TouchableOpacity style={styles.dataPicker} onPress={() => setOpenExTo(true)}>
                                    <Text style={styles.selectText}>{exerciseTo}</Text>
                                </TouchableOpacity>
                            </View>
                            <DatePicker
                                modal
                                mode={'time'}
                                open={openExTo}
                                date={new Date()}
                                onConfirm={(time) => {
                                    setOpenExTo(false)
                                    setExerciseTo(moment(time).format('HH:mm'))
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
                                        <Text style={styles.selectText}>{napFrom}</Text>
                                    </TouchableOpacity>
                                    <DatePicker
                                        modal
                                        mode={'time'}
                                        open={openNapFrom}
                                        date={new Date()}
                                        onConfirm={(time) => {
                                            setOpenNapFrom(false)
                                            setNapFrom(moment(time).format('HH:mm'))
                                        }}
                                        onCancel={() => {
                                            setOpenNapFrom(false)
                                        }}
                                    />
                                </View>
                                <TouchableOpacity style={styles.dataPicker} onPress={() => setOpenNapTo(true)}>
                                    <Text style={styles.selectText}>{napTo}</Text>
                                </TouchableOpacity>
                            </View>
                            <DatePicker
                                modal
                                mode={'time'}
                                open={openNapTo}
                                date={new Date()}
                                onConfirm={(time) => {
                                    setOpenNapTo(false)
                                    setNapTo(moment(time).format('HH:mm'))
                                }}
                                onCancel={() => {
                                    setOpenNapTo(false)
                                }}
                            />
                        </View>
                        <View style={styles.chooseType}>
                            <Text style={styles.globalText}>What time did you get into bed?</Text>
                            <TouchableOpacity style={styles.dataPicker} onPress={() => setOpenIntoBed(true)}>
                                <Text style={styles.selectText}>{intoBed}</Text>
                            </TouchableOpacity>
                            <DatePicker
                                modal
                                mode={'time'}
                                open={openIntoBed}
                                date={new Date()}
                                onConfirm={(time) => {
                                    setOpenIntoBed(false)
                                    setIntoBed(moment(time).format('HH:mm'))
                                }}
                                onCancel={() => {
                                    setOpenIntoBed(false)
                                }}
                            />
                        </View>
                        <View style={styles.chooseType}>
                            <Text style={styles.globalText}>What time did you turn off the lights to go sleep?</Text>
                            <TouchableOpacity style={styles.dataPicker} onPress={() => setOpenGoSleep(true)}>
                                <Text style={styles.selectText}>{goSleep}</Text>
                            </TouchableOpacity>
                            <DatePicker
                                modal
                                mode={'time'}
                                open={openGoSleep}
                                date={new Date()}
                                onConfirm={(time) => {
                                    setOpenGoSleep(false)
                                    setGoSleep(moment(time).format('HH:mm'))
                                }}
                                onCancel={() => {
                                    setOpenGoSleep(false)
                                }}
                            />
                        </View>
                        <View style={styles.chooseType}>
                            <Text style={styles.globalText}>How long did it take you to fall asleep?</Text>
                            <TouchableOpacity style={styles.dataPicker} onPress={() => setOpenFallAsleep(true)}>
                                <Text style={styles.selectText}>{fallAsleep}</Text>
                            </TouchableOpacity>
                            <DatePicker
                                modal
                                mode={'time'}
                                open={openFallAsleep}
                                date={new Date()}
                                onConfirm={(time) => {
                                    setOpenFallAsleep(false)
                                    setFallAsleep(moment(time).format('HH:mm'))
                                }}
                                onCancel={() => {
                                    setOpenFallAsleep(false)
                                }}
                            />
                        </View>
                        <View style={styles.chooseType}>
                            <Text style={styles.globalText}>During the sleep, what timings did you wake up?</Text>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View>
                                    <TouchableOpacity style={styles.dataPicker} onPress={() => setOpenWakeUpFrom(true)}>
                                        <Text style={styles.selectText}>{wakeUpFrom}</Text>
                                    </TouchableOpacity>
                                    <DatePicker
                                        modal
                                        mode={'time'}
                                        open={openWakeUpFrom}
                                        date={new Date()}
                                        onConfirm={(time) => {
                                            setOpenWakeUpFrom(false)
                                            setWakeUpFrom(moment(time).format('HH:mm'))
                                        }}
                                        onCancel={() => {
                                            setOpenWakeUpFrom(false)
                                        }}
                                    />
                                </View>
                                <TouchableOpacity style={styles.dataPicker} onPress={() => setOpenWakeUpTo(true)}>
                                    <Text style={styles.selectText}>{wakeUpTo}</Text>
                                </TouchableOpacity>
                            </View>
                            <DatePicker
                                modal
                                mode={'time'}
                                open={openWakeUpTo}
                                date={new Date()}
                                onConfirm={(time) => {
                                    setOpenWakeUpTo(false)
                                    setWakeUpTo(moment(time).format('HH:mm'))
                                }}
                                onCancel={() => {
                                    setOpenWakeUpTo(false)
                                }}
                            />
                            <View style={styles.addForm}>
                                <TouchableOpacity>
                                    <Image source={require('../../assets/img/add.png')} style={styles.addFormImg}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.chooseType}>
                            <Text style={styles.globalText}>What was your final wake up time?</Text>
                            <TouchableOpacity style={styles.dataPicker} onPress={() => setOpenWakeUpTime(true)}>
                                <Text style={styles.selectText}>{wakeUpTime}</Text>
                            </TouchableOpacity>
                            <DatePicker
                                modal
                                mode={'time'}
                                open={openWakeUpTime}
                                date={new Date()}
                                onConfirm={(time) => {
                                    setOpenWakeUpTime(false)
                                    setWakeUpTime(moment(time).format('HH:mm'))
                                }}
                                onCancel={() => {
                                    setOpenWakeUpTime(false)
                                }}
                            />
                        </View>
                        <View style={styles.chooseType}>
                            <Text style={styles.globalText}>What time did you get out of bed?</Text>
                            <TouchableOpacity style={styles.dataPicker} onPress={() => setOpenOutOfBed(true)}>
                                <Text style={styles.selectText}>{outOfBed}</Text>
                            </TouchableOpacity>
                            <DatePicker
                                modal
                                mode={'time'}
                                open={openOutOfBed}
                                date={new Date()}
                                onConfirm={(time) => {
                                    setOpenOutOfBed(false)
                                    setOutOfBed(moment(time).format('HH:mm'))
                                }}
                                onCancel={() => {
                                    setOpenOutOfBed(false)
                                }}
                            />
                        </View>
                        <View style={styles.chooseType}>
                            <Text style={styles.globalText}>Sleep medications</Text>
                            <View style={{position: 'relative', width: 166, height: 35}}>
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
                                placeholderTextColor={'#2B91BF'}
                                style={styles.textArea}
                                numberOfLines={6}
                                multiline={true}
                                value={week1[activeIndex].data.textAreaInput}
                                onChangeText={(e) => setTextAreaInput(e)}
                            />
                        </View>

                        <AcceptButton />
                    </View>
                    :
                    <View style={styles.content}>
                        <Text style={styles.title}>{week1[activeIndex].data.fullDate}</Text>
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
                            <Text style={styles.globalText}>What time did you last have alcoholic drinks?</Text>
                            <TouchableOpacity style={styles.dataPicker} onPress={() => setOpenAlco(true)}>
                                <Text style={styles.selectText}>{alcoDrinks}</Text>
                            </TouchableOpacity>
                            <DatePicker

                                modal
                                mode={'time'}
                                open={openAlco}
                                date={new Date()}
                                onConfirm={(time) => {
                                    setOpenAlco(false)
                                    setAlcoDrinks(moment(time).format('HH:mm'))
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
                                        <Text style={styles.selectText}>{exerciseFrom}</Text>
                                    </TouchableOpacity>
                                    <DatePicker
                                        modal
                                        mode={'time'}
                                        open={openExFrom}
                                        date={new Date()}
                                        onConfirm={(time) => {
                                            setOpenExFrom(false)
                                            setExerciseFrom(moment(time).format('HH:mm'))
                                        }}
                                        onCancel={() => {
                                            setOpenExFrom(false)
                                        }}
                                    />
                                </View>
                                <TouchableOpacity style={styles.dataPicker} onPress={() => setOpenExTo(true)}>
                                    <Text style={styles.selectText}>{exerciseTo}</Text>
                                </TouchableOpacity>
                            </View>
                            <DatePicker
                                modal
                                mode={'time'}
                                open={openExTo}
                                date={new Date()}
                                onConfirm={(time) => {
                                    setOpenExTo(false)
                                    setExerciseTo(moment(time).format('HH:mm'))
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
                                        <Text style={styles.selectText}>{napFrom}</Text>
                                    </TouchableOpacity>
                                    <DatePicker
                                        modal
                                        mode={'time'}
                                        open={openNapFrom}
                                        date={new Date()}
                                        onConfirm={(time) => {
                                            setOpenNapFrom(false)
                                            setNapFrom(moment(time).format('HH:mm'))
                                        }}
                                        onCancel={() => {
                                            setOpenNapFrom(false)
                                        }}
                                    />
                                </View>
                                <TouchableOpacity style={styles.dataPicker} onPress={() => setOpenNapTo(true)}>
                                    <Text style={styles.selectText}>{napTo}</Text>
                                </TouchableOpacity>
                            </View>
                            <DatePicker
                                modal
                                mode={'time'}
                                open={openNapTo}
                                date={new Date()}
                                onConfirm={(time) => {
                                    setOpenNapTo(false)
                                    setNapTo(moment(time).format('HH:mm'))
                                }}
                                onCancel={() => {
                                    setOpenNapTo(false)
                                }}
                            />
                        </View>
                        <View style={styles.chooseType}>
                            <Text style={styles.globalText}>What time did you get into bed?</Text>
                            <TouchableOpacity style={styles.dataPicker} onPress={() => setOpenIntoBed(true)}>
                                <Text style={styles.selectText}>{intoBed}</Text>
                            </TouchableOpacity>
                            <DatePicker
                                modal
                                mode={'time'}
                                open={openIntoBed}
                                date={new Date()}
                                onConfirm={(time) => {
                                    setOpenIntoBed(false)
                                    setIntoBed(moment(time).format('HH:mm'))
                                }}
                                onCancel={() => {
                                    setOpenIntoBed(false)
                                }}
                            />
                        </View>
                        <View style={styles.chooseType}>
                            <Text style={styles.globalText}>What time did you turn off the lights to go sleep?</Text>
                            <TouchableOpacity style={styles.dataPicker} onPress={() => setOpenGoSleep(true)}>
                                <Text style={styles.selectText}>{goSleep}</Text>
                            </TouchableOpacity>
                            <DatePicker
                                modal
                                mode={'time'}
                                open={openGoSleep}
                                date={new Date()}
                                onConfirm={(time) => {
                                    setOpenGoSleep(false)
                                    setGoSleep(moment(time).format('HH:mm'))
                                }}
                                onCancel={() => {
                                    setOpenGoSleep(false)
                                }}
                            />
                        </View>
                        <View style={styles.chooseType}>
                            <Text style={styles.globalText}>How long did it take you to fall asleep?</Text>
                            <TouchableOpacity style={styles.dataPicker} onPress={() => setOpenFallAsleep(true)}>
                                <Text style={styles.selectText}>{fallAsleep}</Text>
                            </TouchableOpacity>
                            <DatePicker
                                modal
                                mode={'time'}
                                open={openFallAsleep}
                                date={new Date()}
                                onConfirm={(time) => {
                                    setOpenFallAsleep(false)
                                    setFallAsleep(moment(time).format('HH:mm'))
                                }}
                                onCancel={() => {
                                    setOpenFallAsleep(false)
                                }}
                            />
                        </View>
                        <View style={styles.chooseType}>
                            <Text style={styles.globalText}>During the sleep, what timings did you wake up?</Text>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View>
                                    <TouchableOpacity style={styles.dataPicker} onPress={() => setOpenWakeUpFrom(true)}>
                                        <Text style={styles.selectText}>{wakeUpFrom}</Text>
                                    </TouchableOpacity>
                                    <DatePicker
                                        modal
                                        mode={'time'}
                                        open={openWakeUpFrom}
                                        date={new Date()}
                                        onConfirm={(time) => {
                                            setOpenWakeUpFrom(false)
                                            setWakeUpFrom(moment(time).format('HH:mm'))
                                        }}
                                        onCancel={() => {
                                            setOpenWakeUpFrom(false)
                                        }}
                                    />
                                </View>
                                <TouchableOpacity style={styles.dataPicker} onPress={() => setOpenWakeUpTo(true)}>
                                    <Text style={styles.selectText}>{wakeUpTo}</Text>
                                </TouchableOpacity>
                            </View>
                            <DatePicker
                                modal
                                mode={'time'}
                                open={openWakeUpTo}
                                date={new Date()}
                                onConfirm={(time) => {
                                    setOpenWakeUpTo(false)
                                    setWakeUpTo(moment(time).format('HH:mm'))
                                }}
                                onCancel={() => {
                                    setOpenWakeUpTo(false)
                                }}
                            />
                            <View style={styles.addForm}>
                                <TouchableOpacity>
                                    <Image source={require('../../assets/img/add.png')} style={styles.addFormImg}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.chooseType}>
                            <Text style={styles.globalText}>What was your final wake up time?</Text>
                            <TouchableOpacity style={styles.dataPicker} onPress={() => setOpenWakeUpTime(true)}>
                                <Text style={styles.selectText}>{wakeUpTime}</Text>
                            </TouchableOpacity>
                            <DatePicker
                                modal
                                mode={'time'}
                                open={openWakeUpTime}
                                date={new Date()}
                                onConfirm={(time) => {
                                    setOpenWakeUpTime(false)
                                    setWakeUpTime(moment(time).format('HH:mm'))
                                }}
                                onCancel={() => {
                                    setOpenWakeUpTime(false)
                                }}
                            />
                        </View>
                        <View style={styles.chooseType}>
                            <Text style={styles.globalText}>What time did you get out of bed?</Text>
                            <TouchableOpacity style={styles.dataPicker} onPress={() => setOpenOutOfBed(true)}>
                                <Text style={styles.selectText}>{outOfBed}</Text>
                            </TouchableOpacity>
                            <DatePicker
                                modal
                                mode={'time'}
                                open={openOutOfBed}
                                date={new Date()}
                                onConfirm={(time) => {
                                    setOpenOutOfBed(false)
                                    setOutOfBed(moment(time).format('HH:mm'))
                                }}
                                onCancel={() => {
                                    setOpenOutOfBed(false)
                                }}
                            />
                        </View>
                        <View style={styles.chooseType}>
                            <Text style={styles.globalText}>Sleep medications</Text>
                            <View style={{position: 'relative', width: 166, height: 35}}>
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
                        {/* {acceptBtn ?
          <AcceptButton />
          :
          <GlobalButton text={'Save'} handlePress={handleAdddata} />
        } */}
                        <GlobalButton text={'Save'} handlePress={handleAdddata}/>
                    </View>
                }

            </ScrollView>
    );
}


// import { View, ScrollView, StatusBar, Image, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
// import React, { useRef, useState, useEffect } from 'react';
// import styles from './style';
// import DatePicker from 'react-native-date-picker'
// import moment from 'moment';
// import { GlobalButton, AcceptButton } from '../../component';
// import SelectDropdown from 'react-native-select-dropdown'
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export function AddInfo(props) {
//   const [dayInfo, setDayInfo] = useState()
//   const [date, setDate] = useState('00:00')
//   const [openAlco, setOpenAlco] = useState(false)
//   const [openExFrom, setOpenExFrom] = useState(false)
//   const [openExTo, setOpenExTo] = useState(false)
//   const [openNapFrom, setOpenNapFrom] = useState(false)
//   const [openNapTo, setOpenNapTo] = useState(false)
//   const [openIntoBed, setOpenIntoBed] = useState(false)
//   const [openGoSleep, setOpenGoSleep] = useState(false)
//   const [openFallAsleep, setOpenFallAsleep] = useState(false)
//   const [openWakeUpFrom, setOpenWakeUpFrom] = useState(false)
//   const [openWakeUpTo, setOpenWakeUpTo] = useState(false)
//   const [openWakeUpTime, setOpenWakeUpTime] = useState(false)
//   const [openOutOfBed, setOpenOutOfBed] = useState(false)
//   const [alcoDrinks, setAlcoDrinks] = useState('00:00')
//   const [exerciseFrom, setExerciseFrom] = useState("from 00:00")
//   const [exerciseTo, setExerciseTo] = useState("to 00:00")
//   const [napFrom, setNapFrom] = useState("from 00:00")
//   const [napTo, setNapTo] = useState("to 00:00")
//   const [intoBed, setIntoBed] = useState("00:00")
//   const [goSleep, setGoSleep] = useState("00:00")
//   const [wakeUpTime, setWakeUpTime] = useState("00:00")
//   const [outOfBed, setOutOfBed] = useState("00:00")
//   const [fallAsleep, setFallAsleep] = useState("00:00")
//   const [wakeUpFrom, setWakeUpFrom] = useState("from 00:00")
//   const [wakeUpTo, setWakeUpTo] = useState("to 00:00")
//   const [medInput, setMedInput] = useState('')
//   const [textAreaInput, setTextAreaInput] = useState('')
//   const [loading, setLoading] = useState(false)
//   const [saveData, setSaveData] = useState('')
//   const [allData, setAllData] = useState([])
//   const dayDataSave = useRef([])
//   const [activeLeft, setActiveLeft] = useState(true)
//   const [activeRight, setActiveRight] = useState(true)
//   const [acceptBtn, setAcceptBtn] = useState(false)
//   const [indexWeek,setIndexWeeek] = useState(0)
//   const [newData,setNewData] = useState()
//   const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "San"]
//   const countries = ["Work", "School", "Day off", "Vacation"]

//   let dayData = {
//     dayInfo,
//     exerciseFrom,
//     exerciseTo,
//     napFrom,
//     napTo,
//     intoBed,
//     goSleep,
//     wakeUpTime,
//     outOfBed,
//     fallAsleep,
//     wakeUpFrom,
//     wakeUpTo,
//     medInput,
//     textAreaInput,
//     loading
//   }
// console.log(newData);
//   const storeData = async (value) => {
//     try {
//       const jsonValue = JSON.stringify(value)
//       await AsyncStorage.setItem('days', JSON.stringify(value))
//     } catch (e) {
//       // saving error
//     }
//   }

//   const loadData = async (value) => {
//     try {
//       const jsonValue = JSON.stringify(value)
//       await AsyncStorage.setItem('load', JSON.stringify(true))
//     } catch (e) {
//       // saving error
//     }
//   }

//   const getData = async () => {
//     try {
//       const jsonValue = await AsyncStorage.getItem('days')
//       return jsonValue != null ? JSON.parse(jsonValue) : null;
//     } catch (e) {
//       // error reading value
//     }
//   }

//   const getLoadData = async () => {
//     try {
//       const jsonValue = await AsyncStorage.getItem('load')
//       return jsonValue != null ? JSON.parse(jsonValue) : null;
//     } catch (e) {
//       // error reading value
//     }
//   }


//   useEffect(() => {
//     getInfo()
//   }, [dayDataSave.current]);

//   let getInfo = async () => {
//     let infoDay = await getData()
//     let loadingData = await getLoadData()
//     if (infoDay === null) {
//       storeData([])
//     }
//     dayDataSave.current = infoDay
//     console.log(infoDay, 'infoDayinfoDay');
//   }

//   let handleAdddata = async () => {
//     loadData(true)
//     setLoading(true)
//     let infoDay = await getData()
//     let loadingData = await loadData()
//     setAllData(infoDay)
//     let time = setTimeout(() => {
//       dayDataSave.current = infoDay
//       storeData([...infoDay, dayData])
//       setLoading(false)
//       setAcceptBtn(true)
//       clearTimeout(time)
//     }, 1500);
//   }
//   const data = [
//     {
//       week:"Mon",
//       picker:'Choose',
//       drink:"00:00",
//       exercise1:"00:00",
//       exercise2:"00:00",
//       time1:"00:00",
//       time2:"00:00",
//       into:"00:00",
//       sleep:"00:00",
//       durring1:"00:00",
//       durring2:"00:00",
//       final:"00:00",
//       bet:"00:00",
//     },
//     {
//       week: "Tue",

//       picker:'Choose',
//       drink:"555",
//       exercise1:"00:dsf",
//       exercise2:"00:dsfds",
//       time1:"00:sdfsd",
//       time2:"00:dsfds",
//       into:"00:dsfsdf",
//       sleep:"00:dsfds",
//       durring1:"00:sdf",
//       durring2:"00:00",
//       final:"00:00",
//       bet:"00:00",
//     },  {
//       week: "Wed",

//       picker:'Choose',
//       drink:"00:00",
//       exercise1:"dsfsd:00",
//       exercise2:"00:00",
//       time1:"00:00",
//       time2:"00:00",
//       into:"00:sdfsd",
//       sleep:"00:00",
//       durring1:"00:00",
//       durring2:"00:00",
//       final:"00:00",
//       bet:"00:00",
//     }, {
//       week: "Thu",
//       picker:'Choose',
//       drink:"sdf:00",
//       exercise1:"sdf:00",
//       exercise2:"00:00",
//       time1:"00:00",
//       time2:"00:00",
//       into:"00:00",
//       sleep:"00:00",
//       durring1:"00:00",
//       durring2:"00:00",
//       final:"00:00",
//       bet:"00:00",
//     }, {
//       week: "Fri",

//       picker:'Choose',
//       drink:"00:00",
//       exercise1:"00:00",
//       exercise2:"00:00",
//       time1:"00:00",
//       time2:"00:00",
//       into:"00:00",
//       sleep:"00:00",
//       durring1:"00:00",
//       durring2:"00:00",
//       final:"00:00",
//       bet:"00:00",
//     }, {
//       week: "Sat",


//       picker:'Choose',
//       drink:"00:00",
//       exercise1:"00:00",
//       exercise2:"00:00",
//       time1:"00:00",
//       time2:"00:00",
//       into:"00:00",
//       sleep:"00:00",
//       durring1:"00:00",
//       durring2:"00:00",
//       final:"00:00",
//       bet:"00:00",
//     },
//     {
//       week:"San",

//       picker:'Choose',
//       drink:"00:00",
//       exercise1:"00:00",
//       exercise2:"00:00",
//       time1:"00:00",
//       time2:"00:00",
//       into:"00:00",
//       sleep:"00:00",
//       durring1:"00:00",
//       durring2:"00:00",
//       final:"00:00",
//       bet:"00:00",
//     },
//   ]
//   return (
//     loading ?
//       <View style={styles.activLoad}>
//         <ActivityIndicator size="small" color="#0000ff" />
//       </View>
//       :
//     <ScrollView contentContainerStyle={styles.scrollView}>
//       <StatusBar backgroundColor={'#EFEFEF'} barStyle='dark-content' />
//       <View style={styles.topSide}>
//         <View style={styles.weekDayName}>
//           {data.map((item, index) => {
//             // if(index === 0){
//             //   setNewData(item)
//             // }
//             return (
//               <View key={index}>
//                 <TouchableOpacity
//                 onPress={()=>{
//                   setIndexWeeek(index)
//                   setNewData(item)
//                   console.log(item)
//                 }}
//                   style={
//                     [styles.weeKDaysForm,
//                     {
//                       borderTopLeftRadius: index === 0 ? 10 : 0,
//                       borderBottomLeftRadius: index === 0 ? 10 : 0,
//                       borderTopRightRadius: index === 6 ? 10 : 0,
//                       borderBottomEndRadius: index === 6 ? 10 : 0
//                     }
//                     ]} >
//                   <Text style={styles.weeKDaysText}>{item.week}</Text>
//                 </TouchableOpacity>
//               </View>
//             )
//           })}
//         </View>
//         <View style={styles.weekSide}>
//           <View>
//             <TouchableOpacity>
//               <Image source={require('../../assets/img/leftpassive.png')} style={{ width: 10, height: 15 }} />
//             </TouchableOpacity>
//           </View>
//           <Text style={styles.week}>Week 1</Text>
//           <View>
//             <TouchableOpacity >
//               <Image source={require('../../assets/img/right.png')} style={{ width: 10, height: 15 }} />
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//       <View style={styles.content}>
//         <Text style={styles.title}>{moment().format('dddd, MMM DD, YYYY')}</Text>
//         <View style={styles.chooseType}>
//           <Text style={styles.globalText}>Is this a Work/ School/ Day off/ Vacation?</Text>
//           <SelectDropdown
//             data={countries}
//             buttonStyle={styles.selectStyle}
//             defaultButtonText="Choose"
//             buttonTextStyle={styles.selectText}
//             dropdownIconPosition='right'
//             rowTextStyle={{
//               color: '#2B91BF',
//               fontFamily: "Quicksand-Regular",
//             }}
//             dropdownStyle={
//               {
//                 backgroundColor: '#FFF',
//                 borderRadius: 10
//               }
//             }
//             onSelect={(selectedItem, index) => {
//               setDayInfo(selectedItem)
//             }}
//             buttonTextAfterSelection={(selectedItem, index) => {
//               return selectedItem
//             }}
//             rowTextForSelection={(item, index) => {
//               return item
//             }}
//             renderDropdownIcon={() => <Image source={require('../../assets/img/open.png')} style={styles.iconStyle} />}
//           />
//         </View>
//         <View style={styles.chooseType}>
//           <Text style={styles.globalText}>What time did you last have alcoholic drinks?</Text>
//           <TouchableOpacity style={styles.dataPicker} onPress={() => setOpenAlco(true)}>
//             <Text style={styles.selectText}>{alcoDrinks}</Text>
//           </TouchableOpacity>
//           <DatePicker
//             modal
//             mode={'time'}
//             open={openAlco}
//             date={new Date()}
//             onConfirm={(time) => {
//               setOpenAlco(false)
//               setAlcoDrinks(moment(time).format('HH:mm'))
//             }}
//             onCancel={() => {
//               setOpenAlco(false)
//             }}
//           />
//         </View>
//         <View style={styles.chooseType}>
//           <Text style={styles.globalText}>What time did you last exercise?</Text>
//           <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
//             <View>
//               <TouchableOpacity style={styles.dataPicker} onPress={() => setOpenExFrom(true)}>
//                 <Text style={styles.selectText}>{exerciseFrom}</Text>
//               </TouchableOpacity>
//               <DatePicker
//                 modal
//                 mode={'time'}
//                 open={openExFrom}
//                 date={new Date()}
//                 onConfirm={(time) => {
//                   setOpenExFrom(false)
//                   setExerciseFrom(moment(time).format('HH:mm'))
//                 }}
//                 onCancel={() => {
//                   setOpenExFrom(false)
//                 }}
//               />
//             </View>
//             <TouchableOpacity style={styles.dataPicker} onPress={() => setOpenExTo(true)}>
//               <Text style={styles.selectText}>{exerciseTo}</Text>
//             </TouchableOpacity>
//           </View>
//           <DatePicker
//             modal
//             mode={'time'}
//             open={openExTo}
//             date={new Date()}
//             onConfirm={(time) => {
//               setOpenExTo(false)
//               setExerciseTo(moment(time).format('HH:mm'))
//             }}
//             onCancel={() => {
//               setOpenExTo(false)
//             }}
//           />
//         </View>
//         <View style={styles.chooseType}>
//           <Text style={styles.globalText}>What time did you last take a nap?</Text>
//           <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
//             <View>
//               <TouchableOpacity style={styles.dataPicker} onPress={() => setOpenNapFrom(true)}>
//                 <Text style={styles.selectText}>{napFrom}</Text>
//               </TouchableOpacity>
//               <DatePicker
//                 modal
//                 mode={'time'}
//                 open={openNapFrom}
//                 date={new Date()}
//                 onConfirm={(time) => {
//                   setOpenNapFrom(false)
//                   setNapFrom(moment(time).format('HH:mm'))
//                 }}
//                 onCancel={() => {
//                   setOpenNapFrom(false)
//                 }}
//               />
//             </View>
//             <TouchableOpacity style={styles.dataPicker} onPress={() => setOpenNapTo(true)}>
//               <Text style={styles.selectText}>{napTo}</Text>
//             </TouchableOpacity>
//           </View>
//           <DatePicker
//             modal
//             mode={'time'}
//             open={openNapTo}
//             date={new Date()}
//             onConfirm={(time) => {
//               setOpenNapTo(false)
//               setNapTo(moment(time).format('HH:mm'))
//             }}
//             onCancel={() => {
//               setOpenNapTo(false)
//             }}
//           />
//         </View>
//         <View style={styles.chooseType}>
//           <Text style={styles.globalText}>What time did you get into bed?</Text>
//           <TouchableOpacity style={styles.dataPicker} onPress={() => setOpenIntoBed(true)}>
//             <Text style={styles.selectText}>{intoBed}</Text>
//           </TouchableOpacity>
//           <DatePicker
//             modal
//             mode={'time'}
//             open={openIntoBed}
//             date={new Date()}
//             onConfirm={(time) => {
//               setOpenIntoBed(false)
//               setIntoBed(moment(time).format('HH:mm'))
//             }}
//             onCancel={() => {
//               setOpenIntoBed(false)
//             }}
//           />
//         </View>
//         <View style={styles.chooseType}>
//           <Text style={styles.globalText}>What time did you turn off the lights to go sleep?</Text>
//           <TouchableOpacity style={styles.dataPicker} onPress={() => setOpenGoSleep(true)}>
//             <Text style={styles.selectText}>{goSleep}</Text>
//           </TouchableOpacity>
//           <DatePicker
//             modal
//             mode={'time'}
//             open={openGoSleep}
//             date={new Date()}
//             onConfirm={(time) => {
//               setOpenGoSleep(false)
//               setGoSleep(moment(time).format('HH:mm'))
//             }}
//             onCancel={() => {
//               setOpenGoSleep(false)
//             }}
//           />
//         </View>
//         <View style={styles.chooseType}>
//           <Text style={styles.globalText}>How long did it take you to fall asleep?</Text>
//           <TouchableOpacity style={styles.dataPicker} onPress={() => setOpenFallAsleep(true)}>
//             <Text style={styles.selectText}>{fallAsleep}</Text>
//           </TouchableOpacity>
//           <DatePicker
//             modal
//             mode={'time'}
//             open={openFallAsleep}
//             date={new Date()}
//             onConfirm={(time) => {
//               setOpenFallAsleep(false)
//               setFallAsleep(moment(time).format('HH:mm'))
//             }}
//             onCancel={() => {
//               setOpenFallAsleep(false)
//             }}
//           />
//         </View>
//         <View style={styles.chooseType}>
//           <Text style={styles.globalText}>During the sleep, what timings did you wake up?</Text>
//           <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
//             <View>
//               <TouchableOpacity style={styles.dataPicker} onPress={() => setOpenWakeUpFrom(true)}>
//                 <Text style={styles.selectText}>{wakeUpFrom}</Text>
//               </TouchableOpacity>
//               <DatePicker
//                 modal
//                 mode={'time'}
//                 open={openWakeUpFrom}
//                 date={new Date()}
//                 onConfirm={(time) => {
//                   setOpenWakeUpFrom(false)
//                   setWakeUpFrom(moment(time).format('HH:mm'))
//                 }}
//                 onCancel={() => {
//                   setOpenWakeUpFrom(false)
//                 }}
//               />
//             </View>
//             <TouchableOpacity style={styles.dataPicker} onPress={() => setOpenWakeUpTo(true)}>
//               <Text style={styles.selectText}>{wakeUpTo}</Text>
//             </TouchableOpacity>
//           </View>
//           <DatePicker
//             modal
//             mode={'time'}
//             open={openWakeUpTo}
//             date={new Date()}
//             onConfirm={(time) => {
//               setOpenWakeUpTo(false)
//               setWakeUpTo(moment(time).format('HH:mm'))
//             }}
//             onCancel={() => {
//               setOpenWakeUpTo(false)
//             }}
//           />
//           <View style={styles.addForm}>
//             <TouchableOpacity >
//               <Image source={require('../../assets/img/add.png')} style={styles.addFormImg} />
//             </TouchableOpacity>
//           </View>
//         </View>
//         <View style={styles.chooseType}>
//           <Text style={styles.globalText}>What was your final wake up time?</Text>
//           <TouchableOpacity style={styles.dataPicker} onPress={() => setOpenWakeUpTime(true)}>
//             <Text style={styles.selectText}>{wakeUpTime}</Text>
//           </TouchableOpacity>
//           <DatePicker
//             modal
//             mode={'time'}
//             open={openWakeUpTime}
//             date={new Date()}
//             onConfirm={(time) => {
//               setOpenWakeUpTime(false)
//               setWakeUpTime(moment(time).format('HH:mm'))
//             }}
//             onCancel={() => {
//               setOpenWakeUpTime(false)
//             }}
//           />
//         </View>
//         <View style={styles.chooseType}>
//           <Text style={styles.globalText}>What time did you get out of bed?</Text>
//           <TouchableOpacity style={styles.dataPicker} onPress={() => setOpenOutOfBed(true)}>
//             <Text style={styles.selectText}>{outOfBed}</Text>
//           </TouchableOpacity>
//           <DatePicker
//             modal
//             mode={'time'}
//             open={openOutOfBed}
//             date={new Date()}
//             onConfirm={(time) => {
//               setOpenOutOfBed(false)
//               setOutOfBed(moment(time).format('HH:mm'))
//             }}
//             onCancel={() => {
//               setOpenOutOfBed(false)
//             }}
//           />
//         </View>
//         <View style={styles.chooseType}>
//           <Text style={styles.globalText}>Sleep medications</Text>
//           <View style={{ position: 'relative', width: 166, height: 35 }}>
//             <TextInput
//               style={styles.inputStyle}
//               numberOfLines={1}
//               value={medInput}
//               onChangeText={(e) => setMedInput(e)}
//             />
//           </View>
//         </View>
//         <View style={styles.chooseType}>
//           <Text style={styles.globalText}>Sleep medications</Text>
//           <TextInput
//             placeholder='Record any other factors that may affect your sleep:'
//             placeholderTextColor={'#2B91BF'}
//             style={styles.textArea}
//             numberOfLines={6}
//             multiline={true}
//             value={textAreaInput}
//             onChangeText={(e) => setTextAreaInput(e)}
//           />
//         </View>
//         {data.map((item,index) =>{
//             return(
//               <View>
//                 <Text style={{color:"red"}}>ddd</Text>
//               </View>
//             )
//         })}
//         {/* {acceptBtn ?
//           <AcceptButton />
//           :
//           <GlobalButton text={'Save'} handlePress={handleAdddata} />
//         } */}
//         <GlobalButton text={'Save'} handlePress={handleAdddata} />
//       </View>
//     </ScrollView>
//   );
// }
