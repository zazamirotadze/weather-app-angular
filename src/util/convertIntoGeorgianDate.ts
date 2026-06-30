const weekdayMap: Record<string, string> = 
{
    'Monday': $localize`ორშაბათი`,
    'Tuesday': $localize`სამშაბათი`,
    'Wednesday': $localize`ოთხშაბათი`,
    'Thursday': $localize`ხუთშაბათი`,
    'Friday': $localize`პარასკევი`,
    'Saturday': $localize`შაბათი`,
    'Sunday': $localize`კვირა`
};

const monthMap: Record<string, string> = 
{
    'January': $localize`იანვარი`,
    'February': $localize`თებერვალი`,
    'March': $localize`მარტი`,
    'April': $localize`აპრილი`,
    'May': $localize`მაისი`,
    'June': $localize`ივნისი`,
    'July': $localize`ივლისი`,
    'August': $localize`აგვისტო`,
    'September': $localize`სექტემბერი`,
    'October': $localize`ოქტომბერი`,
    'November': $localize`ნოემბერი`,
    'December': $localize`დეკემბერი`
};

const convertIntoGeorgianDate = (date: string): string => {
    const isoDate = date.replace(" ", "T")
    
    if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/.test(isoDate)){
        return date
    }

    const
        formattedDate = new Date(isoDate).toLocaleString("en-US", {
            weekday: "long", 
            month: "long",  
            day: "numeric"
        }),

        engWeekday = formattedDate.split(',')[0],
        engMonth = formattedDate.split(' ')[1],
        translatedWeekday = weekdayMap[engWeekday] || engWeekday,
        translatedMonth = monthMap[engMonth] || engMonth;

    return formattedDate.replace(engWeekday, translatedWeekday).replace(engMonth, translatedMonth);
}

export {convertIntoGeorgianDate}