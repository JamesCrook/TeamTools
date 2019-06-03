import csv

with open('ImportedEnhancements.csv', 'r') as csvFile:
    reader = csv.reader(csvFile)
    for row in reader:
        print( '[ ] [[https://bugzilla.audacityteam.org/show_bug.cgi?id=',row[0],'|',row[0],']] ',row[3],' (',row[1],', with ',row[4],' comments)',sep='')

csvFile.close()
