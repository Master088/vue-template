export const downloadCSV = (data, title) => {
  // Get the keys of the first object to use as column headers
  const columns = Object.keys(data[0])

  // Create the CSV content
  const csvContent =
    'data:text/csv;charset=utf-8,' +
    columns.join(',') +
    '\n' + // Add column headers
    data
      .map((row) => {
        return columns
          .map((column) => {
            const field =
              row[column] !== null && row[column] !== undefined ? String(row[column]) : '' // Handle null/undefined
            return field.includes(',') ? `"${field}"` : field // Escape commas in the field
          })
          .join(',')
      })
      .join('\n')

  // Encode the content and create a downloadable link
  const encodedUri = encodeURI(csvContent)
  const link = document.createElement('a')
  link.setAttribute('href', encodedUri)
  link.setAttribute('download', `${title}.csv`)
  document.body.appendChild(link)
  link.click()
}
