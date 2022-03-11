import React, { useState } from 'react'
import DatePicker from 'react-native-date-picker'
import styles from './style';

export function DataPickerGlobal(props) {
    return (
        <DatePicker
            is24hourSource={'device'}
            // textColor='#FFF'
            modal
            mode={'datetime'}
            open={props.showHide}
            date={props.date}
            onConfirm={props.confirm}
            onCancel={props.cancel}
            state={() => props.showHide}
        />
    )
}
