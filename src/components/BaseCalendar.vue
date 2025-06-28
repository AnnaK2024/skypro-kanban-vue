<template>
  <div class="pop-new-card__calendar calendar">
    <p class="calendar__ttl subttl">Даты</p>
    <div class="calendar__block">
      <div class="calendar__nav">
        <div class="calendar__month">{{ monthYear }}</div>
        <div class="nav__actions">
          <div
            class="nav__action"
            data-action="prev"
            :class="{ disabled: disabled }"
            @click="!disabled && prevMonth()"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="6" height="11" viewBox="0 0 6 11">
              <path
                d="M5.72945 1.95273C6.09018 1.62041 6.09018 1.0833 5.72945 0.750969C5.36622 0.416344 4.7754 0.416344 4.41218 0.750969L0.528487 4.32883C-0.176162 4.97799 -0.176162 6.02201 0.528487 6.67117L4.41217 10.249C4.7754 10.5837 5.36622 10.5837 5.72945 10.249C6.09018 9.9167 6.09018 9.37959 5.72945 9.04727L1.87897 5.5L5.72945 1.95273Z"
              />
            </svg>
          </div>
          <div
            class="nav__action"
            data-action="next"
            :class="{ disabled: disabled }"
            @click="!disabled && nextMonth()"
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
            v-for="(cell, idx) in calendarCells"
            :key="idx"
            class="calendar__cell"
            :class="[
              cell.otherMonth ? '_other-month' : '_cell-day',
              cell.weekend ? '_weekend' : '',
              isSelected(cell.date) ? '_current' : '',
              disabled ? 'disabled' : '',
            ]"
            @click="!disabled && selectDate(cell.date)"
          >
            {{ cell.day }}
          </div>
        </div>
      </div>

      <input type="hidden" id="datepick_value" :value="formattedSelectedDate" />
      <div class="calendar__period">
        <p class="calendar__p date-end">
          Выберите срок исполнения <span class="date-control"></span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  modelValue: String,
  disabled: Boolean,
})

const emit = defineEmits(['update:modelValue'])

const currentMonth = ref(new Date())
const selectedDate = ref(null)

// При изменении modelValue синхронизируем selectedDate и currentMonth
watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      const parts = val.split('.')
      if (parts.length === 3) {
        const d = new Date(+parts[2], parts[1] - 1, +parts[0])
        selectedDate.value = d
        currentMonth.value = new Date(d.getFullYear(), d.getMonth(), 1)
      }
    } else {
      selectedDate.value = null
    }
  },
  { immediate: true },
)

const monthYear = computed(() => {
  return currentMonth.value.toLocaleDateString('ru-RU', {
    month: 'long',
    year: 'numeric',
  })
})

function isWeekend(date) {
  const day = date.getDay()
  return day === 0 || day === 6
}

const calendarCells = computed(() => {
  const year = currentMonth.value.getFullYear()
  const month = currentMonth.value.getMonth()

  const firstDay = new Date(year, month, 1)
  let startWeekDay = firstDay.getDay()
  if (startWeekDay === 0) startWeekDay = 7

  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const daysInPrevMonth = new Date(year, month, 0).getDate()

  const cells = []

  // Дни предыдущего месяца
  for (let i = startWeekDay - 1; i > 0; i--) {
    const day = daysInPrevMonth - i + 1
    const date = new Date(year, month - 1, day)
    cells.push({
      day,
      date,
      otherMonth: true,
      weekend: isWeekend(date),
    })
  }

  // Дни текущего месяца
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day)
    cells.push({
      day,
      date,
      otherMonth: false,
      weekend: isWeekend(date),
    })
  }

  // Дни следующего месяца
  const totalCells = 42
  const remaining = totalCells - cells.length
  for (let day = 1; day <= remaining; day++) {
    const date = new Date(year, month + 1, day)
    cells.push({
      day,
      date,
      otherMonth: true,
      weekend: isWeekend(date),
    })
  }

  return cells
})

function isSelected(date) {
  if (!selectedDate.value) return false
  return (
    date.getFullYear() === selectedDate.value.getFullYear() &&
    date.getMonth() === selectedDate.value.getMonth() &&
    date.getDate() === selectedDate.value.getDate()
  )
}

function selectDate(date) {
  selectedDate.value = date
  emit('update:modelValue', formatDate(date))
}

function formatDate(date) {
  const d = String(date.getDate()).padStart(2, '0')
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const y = date.getFullYear()
  return `${d}.${m}.${y}`
}

const formattedSelectedDate = computed(() => {
  return selectedDate.value ? formatDate(selectedDate.value) : ''
})

function prevMonth() {
  currentMonth.value = new Date(
    currentMonth.value.getFullYear(),
    currentMonth.value.getMonth() - 1,
    1,
  )
}

function nextMonth() {
  currentMonth.value = new Date(
    currentMonth.value.getFullYear(),
    currentMonth.value.getMonth() + 1,
    1,
  )
}
</script>

<style scoped>
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
  display: block;
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
.calendar__cell.disabled {
  pointer-events: none;
  opacity: 0.4;
  cursor: default;
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
.nav__action.disabled {
  opacity: 0.4;
  pointer-events: none;
  cursor: default;
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
</style>
