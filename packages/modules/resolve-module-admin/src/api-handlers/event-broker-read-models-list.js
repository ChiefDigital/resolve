const readModelList = async (req, res) => {
  const listenerIds = req.resolve.readModels.map(({ name }) => name)
  const statuses = await Promise.all(
    listenerIds.map(req.resolve.publisher.status)
  )
  res.json(statuses)
}

export default readModelList
