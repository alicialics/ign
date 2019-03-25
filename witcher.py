from collections import namedtuple
from bisect import bisect

Item = namedtuple('Item', ['category', 'name', 'cost', 'value'])
ItemPair = namedtuple('ItemPair', ['cost', 'value', 'i', 'j'])

f = open("witcher.in", "r")

items = []
itemsByCategory = dict()

# Parse input.
for line in f.read().splitlines():
    parsed = line.split(" ")
    if len(parsed) == 0:
        continue
    category = parsed[0]
    name = " ".join(parsed[1:-2])
    cost = int(parsed[-2])
    value = int(parsed[-1])
    item = Item(category, name, cost, value)
    itemIndex = len(items)
    items.append(item)

    if not category in itemsByCategory:
        itemsByCategory[category] = []
    itemsByCategory[category].append(itemIndex)

# for each category, keep a list of item pairs that gives us the greatest value given the cost cost.  O(n^2logn)
sortedValuePairs = dict()
for category in itemsByCategory:
    allPairs = []
    for i in itemsByCategory[category]:
        for j in itemsByCategory[category]:
            if i != j:
                allPairs.append(
                    ItemPair(items[i].cost + items[j].cost, items[i].value + items[j].value, i, j))

    allPairs.sort(key=lambda x: x.value, reverse=True)
    bestValues = []
    for pair in allPairs:
        if len(bestValues) == 0 or (bestValues[-1].value > pair.value and bestValues[-1].cost > pair.cost):
            bestValues.append(pair)
        elif bestValues[-1].value == pair.value and bestValues[-1].cost > pair.cost:
            bestValues[-1] = pair

    bestValues.sort(key=lambda x: x.cost)
    sortedValuePairs[category] = bestValues

# Given an amount to spend, find two items in a category that gives the best value.  O(log(n))


def bestValueInCategory(category, amount):
    index = bisect(sortedValuePairs[category], ItemPair(amount+1, 0, 0, 0))
    if (index == 0):
        return None
    return sortedValuePairs[category][index-1]

# increment the position index in indices by 1.  Return false if there are no more valid increments.


def incrementIndex(indices, index, restCategories):
    if index == len(indices):
        return False
    indices[index] += 1
    if indices[index] == len(itemsByCategory[restCategories[index]]):
        indices[index] = 0
        return incrementIndex(indices, index+1, restCategories)
    return True


# Find one item from each of k categories, and one extra item.  O(n^(k-1)*log(n))
# However, a greedy algorithm exists here somewhere, i.e. IMINO:
# IMINO = IfMoneyIsNoObject, we just take the items with the most value in each category,
# that would result in just an O(n) algorithm...
def findBestCombination(amount):
    bestVal = -1
    bestItems = []
    # Take two items in special cateory
    for specialCategory in itemsByCategory:
        restCategories = itemsByCategory.keys()
        restCategories.remove(specialCategory)
        # Loop through all possible combinations for items in restCategories, take one of each.
        indices = [0]*len(restCategories)
        while True:
            cost = sortedValuePairs[specialCategory][0].cost
            value = 0
            currItems = []
            # Special category is too expansive..
            if cost > amount:
                break
            moreItems = False
            for index in range(len(restCategories)):
                item = items[itemsByCategory[restCategories[index]]
                             [indices[index]]]
                currItems.append(item)
                cost += item.cost
                value += item.value
                if cost > amount:
                    moreItems = incrementIndex(indices, index, restCategories)
                    break
            # See if we took something too expansive from restCategory..
            if cost > amount:
                if moreItems:
                    continue
                else:
                    break

            cost -= sortedValuePairs[specialCategory][0].cost
            pair = bestValueInCategory(specialCategory, amount - cost)
            # See if we get something better
            if cost + pair.cost <= amount and value + pair.value > bestVal:
                bestVal = value + pair.value
                currItems.append(items[pair.i])
                currItems.append(items[pair.j])
                bestItems = currItems
            if incrementIndex(indices, 0, restCategories):
                continue
            else:
                break
    return bestItems


# Helmet: Keeton Mask Cost: 77 Value: 24
# Chest: Chestpiece of Vachon Cost: 64 Value: 23
# Leggings: Tattered Shorts Cost: 42 Value: 13
# Boots: Diamond Boots Cost: 64 Value: 18
# Boots: Tate's Spiked Cleats Cost: 52 Value: 20
# Total Cost: 299
# Total Value: 98

bestItems = findBestCombination(300)
for item in bestItems:
    print("%s: %s Cost: %d Value: %d" %
          (item.category, item.name, item.cost, item.value))
print("Total Cost: %d" % sum(item.cost for item in bestItems))
print("Total Value: %d" % sum(item.value for item in bestItems))
