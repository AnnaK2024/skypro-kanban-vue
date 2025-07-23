<template>
  <div class="pop-new-card__calendar calendar" :class="{ disabled: disabled }">
    <p class="calendar__ttl subttl">Даты</p>
    <div class="calendar__block">
      <div class="calendar__content-wrapper">
        <div class="calendar__nav">
          <div class="calendar__month">{{ formattedMonthYear }}</div>
          <div class="nav__actions">
            <div
              class="nav__action"
              @click="prevMonth"
              title="Предыдущий месяц"
              :class="{ disabled: disabled }"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="6" height="11" viewBox="0 0 6 11">
                <path
                  d="M5.72945 1.95273C6.09018 1.62041 6.09018 1.0833 5.72945 0.750969C5.36622 0.416344 4.7754 0.416344 4.41218 0.750969L0.528487 4.32883C-0.176162 4.97799 -0.176162 6.02201 0.528487 6.67117L4.41217 10.249C4.7754 10.5837 5.36622 10.5837 5.72945 10.249C6.09018 9.9167 6.09018 9.37959 5.72945 9.04727L1.87897 5.5L5.72945 1.95273Z"
                />
              </svg>
            </div>
            <div
              class="nav__action"
              @click="nextMonth"
              title="Следующий месяц"
              :class="{ disabled: disabled }"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="6" height="11" viewBox="0 0 6 11">
                <path
                  d="M0.27055 9.04727C-0.0901833 9.37959 -0.0901832 9.9167 0.27055 10.249C0.633779 10.5837 1.2246 10.5837 1.58783 10.249L5.47151 6.67117C6.17616 6.02201 6.17616 4.97799 5.47151 4.32883L1.58782 0.75097C1.2246 0.416344 0.633778 0.416344 0.270549 0.75097C-0.0901831 1.0833 -0.090184 1.62041 0.270549 1.95273L4.12103 5.5L0.27055 9.04727Z"
                />
              </svg>
            </div>
          </div>
        </div>
        <div class="calendar__content">
          <div class="calendar__days-names">
            <div class="calendar__day-name">пн</div>
            <div class="calendar__day-name">вт</div>
            <div class="calendar__day-name">ср</div>
            <div class="calendar__day-name">чт</div>
            <div class="calendar__day-name">пт</div>
            <div class="calendar__day-name -weekend-">сб</div>
            <div class="calendar__day-name -weekend-">вс</div>
          </div>
          <div class="calendar__cells">
            <div
              v-for="(day, index) in calendarDays"
              :key="index"
              :class="[
                'calendar__cell',
                { '_other-month': !day.isCurrentMonth },
                { _weekend: day.isWeekend },
                { _current: isToday(day.date) },
                { '_active-day': isSelected(day.date) },
                { disabled: disabled },
              ]"
              @click="selectDate(day.date)"
            >
              {{ day.number }}
            </div>
          </div>
        </div>
      </div>

      <div class="calendar__period">
        <p class="calendar__p date-end" v-if="selectedDate">
          Срок исполнения <span class="date-control">{{ formattedSelectedDate }}</span
          >.
        </p>
        <p class="calendar__p date-end" v-else>Выберите срок исполнения.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  format,
  isToday as isDateToday,
  addMonths,
  subMonths,
  getDay,
} from 'date-fns'
import { ru } from 'date-fns/locale'

const props = defineProps({
  modelValue: [Date, String, null],
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue'])

function toDate(date) {
  if (!date) return null
  if (date instanceof Date) return date
  const d = new Date(date)
  return isNaN(d) ? null : d
}

const today = new Date()
const initialDate = toDate(props.modelValue)
const currentMonth = ref(initialDate ? new Date(initialDate.getFullYear(), initialDate.getMonth(), 1) : new Date(today.getFullYear(), today.getMonth(), 1))
const selectedDate = ref(initialDate)

watch(() => props.modelValue, (newVal) => {
  const newDate = toDate(newVal)
  selectedDate.value = newDate
  if (newDate) {
    currentMonth.value = new Date(newDate.getFullYear(), newDate.getMonth(), 1)
  }
})

function generateCalendarDays(monthDate) {
  const startMonth = startOfMonth(monthDate)
  const endMonth = endOfMonth(monthDate)
  const startDate = startOfWeek(startMonth, { weekStartsOn: 1 }) 
  const endDate = endOfWeek(endMonth, { weekStartsOn: 1 })

  const days = []
  let date = startDate
  while (date <= endDate) {
    days.push({
      date: new Date(date),
      number: date.getDate(),
      isCurrentMonth: isSameMonth(date, monthDate),
      isWeekend: getDay(date) === 0 || getDay(date) === 6, 
    })
    date = addDays(date, 1)
  }
  return days
}

const calendarDays = computed(() => generateCalendarDays(currentMonth.value))

function selectDate(date) {
  if (props.disabled) return

  if (selectedDate.value && date && selectedDate.value.getTime() === date.getTime()) {
    selectedDate.value = null
    emit('update:modelValue', null)
  } else {
    selectedDate.value = date
    emit('update:modelValue', date)
  }
}

function isSelected(date) {
  return selectedDate.value ? isSameDay(date, selectedDate.value) : false
}

function isToday(date) {
  return isDateToday(date)
}

function prevMonth() {
  currentMonth.value = subMonths(currentMonth.value, 1)
}

function nextMonth() {
  currentMonth.value = addMonths(currentMonth.value, 1)
}

const formattedMonthYear = computed(() => format(currentMonth.value, 'LLLL yyyy', { locale: ru }))

const formattedSelectedDate = computed(() =>
  selectedDate.value ? format(selectedDate.value, 'dd.MM.yyyy') : '',
)
</script>

<style lang="scss" scoped>
.subttl {
  color: #000;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
}
.calendar {
  width: 182px;
  margin-bottom: 20px;
}
.calendar__ttl {
  margin-bottom: 14px;
  padding: 0 7px;
}
.calendar__p {
  color: #94a6be;
  font-size: 10px;
  line-height: 1;
}
.calendar__p span {
  color: #000000;
}
.calendar__block {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
}
.calendar__month {
  color: #94a6be;
  font-size: 14px;
  line-height: 25px;
  font-weight: 600;
}
.calendar__content {
  margin-bottom: 12px;
}
.calendar__days-names {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  margin: 7px 0;
  padding: 0 7px;
}
.calendar__day-name {
  color: #94a6be;
  font-size: 10px;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.2px;
}
.calendar__cells {
  width: 182px;
  height: 126px;
  display: flex;
  flex-wrap: wrap;
}
.calendar__cell {
  width: 22px;
  height: 22px;
  margin: 2px;
  border-radius: 50%;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  color: #94a6be;
  font-size: 10px;
  line-height: 1;
  letter-spacing: -0.2px;
  cursor: pointer;
}
.calendar__cell:hover {
  background-color: #eaeef6;
  cursor: pointer;
}
.calendar__nav {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 14px;
  padding: 0 7px;
}
.calendar__period {
  padding: 0 7px;
}
.nav__actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.nav__action {
  width: 18px;
  height: 25px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
.nav__action svg {
  fill: #94a6be;
}
._other-month {
  opacity: 0;
}
._cell-day:hover {
  color: #94a6be;
  background-color: #eaeef6;
}
._active-day {
  background-color: #94a6be;
  color: #ffffff;
}
._current {
  font-weight: 700;
}
@media screen and (max-width: 660px) {
  .calendar {
    max-width: 340px;
    width: 100%;
  }
  .calendar__ttl,
  .calendar__nav,
  .calendar__period {
    padding: 0;
  }
  .calendar .date-create {
    display: none;
    margin-bottom: 7px;
  }
  .calendar__p {
    font-size: 14px;
  }
  .calendar__day-name {
    font-size: 14px;
  }
  .calendar__cells {
    width: 344px;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  .calendar__cell {
    width: 42px;
    height: 42px;
    font-size: 14px;
  }
}
body.dark-theme{
  .calendar__p span {
  color: #ffffff;
  }
  .calendar__cell:hover {
  background-color: black;
  cursor: pointer;
}
 ._active-day {
  background-color: #94a6be;
  color: black;
}
}
</style>
