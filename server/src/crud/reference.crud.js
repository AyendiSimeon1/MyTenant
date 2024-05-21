const updateReference = async (id, data) => {
    return await prisma.reference.update({
      where: { id },
      data,
    });
  };
  

  const getReferenceById = async (id) => {
    return await prisma.reference.findUnique({ where: { id } });
  };
  