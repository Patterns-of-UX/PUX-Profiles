const exp_list=[
    {
        'id': 'You can see relationships between parts',
        'name': 'SE1',
        'link_positive': [{'IA1': 0.7}, {'IA2': 0.7}, {'VE1': 0.9}, {'VE5': 0.8}],
        'link_negative': [{'VE4': -0.6}, {'VE2': -0.7}, {'VE3': -0.7}, {'SE2': -0.9}]
      },
      {
        'id': 'You can change your mind easily',
        'name': 'SE2',
        'link_positive': [],
        'link_negative': [{'SE1': -0.9}]
      },
      {
        'id': 'There are routes linking known to undiscovered',
        'name': 'SE3',
        'link_positive': [{'SE1': 0.8}, {'ME3': 0.7}, {'TE1': 0.6}, {'IE3': 0.7}, {'ME5': 0.5}],
        'link_negative': []
      },
      {
        'id': 'You can compare or contrast different parts',
        'name': 'SE4',
        'link_positive': [{'VE1': 0.9}, {'VE5': 0.6}, {'ME3': 0.7}, {'ME4': 0.7}, {'TE2': 0.5}],
        'link_negative': []
      },
      
      {
        'id': 'The information you need is visible',
        'name': 'VE1',
        'link_positive': [{'VE4': 0.9}],
        'link_negative': []
      },
      {
        'id': 'The overall story is clear',
        'name': 'VE2',
        'link_positive': [{'VE1': 0.9}, {'SE1': 0.8}],
        'link_negative': [{'VE5': -0.7}]
      },
      {
        'id': 'Important parts draw your attention',
        'name': 'VE3',
        'link_positive': [{'ME2': 0.8}, {'IE6': 0.8}, {'CE2': 0.4}],
        'link_negative': []
      },
      {
        'id': 'The visual layout is concise',
        'name': 'VE4',
        'link_positive': [],
        'link_negative': [{'SE1': -0.9},{'ME5': -0.7}, {'IE3': -0.7}, {'IE4': -0.6}, {'ME1': -0.8}, {'TE4': -0.8}]
      },
      {
        'id': 'You can see detail in context',
        'name': 'VE5',
        'link_positive': [{'VE1': 0.9}, {'VE2': 0.9}, {'VE3': 0.9}, {'VE4': 0.9}],
        'link_negative': [{'IE1': -0.6}, {'IE2': -0.6}, {'IE3': -0.6}]
      },
      {
        'id': 'It looks like what it describes',
        'name': 'ME1',
        'link_positive': [{'TE4': 0.8}],
        'link_negative': [{'VE4': -0.8}, {'ME4': -0.6}, {'CE2': -0.7}, {'CE3': -0.7}]
      },
      {
        'id': 'The purpose of each part is clear',
        'name': 'ME2',
        'link_positive': [{'ME1': 0.8}, {'PE2': 0.7}, {'VE3': 0.5}],
        'link_negative': []
      },
      {
        'id': 'Similar things look similar',
        'name': 'ME3',
        'link_positive': [{'SE4': 0.9}, {'VE2': 0.6}, {'VE3': 0.6}, {'ME2': 0.6}],
        'link_negative': [{'ME4': -0.7}]
      },
      {
        'id': 'You can tell the difference between things',
        'name': 'ME4',
        'link_positive': [{'IE4': 0.8}, {'VE3': 0.7}, {'SE4': 0.7}],
        'link_negative': [{'CE3': -0.6}, {'TE3': -0.5}]
      },
      {
        'id': 'You can add comments',
        'name': 'ME5',
        'link_positive': [{'CE1': 0.5}, {'CE4': 0.8}, {'IE3': 0.7}, {'TE1': 0.7}],
        'link_negative': []
      },
      {
        'id': 'The visual connotations are appropriate',
        'name': 'ME6',
        'link_positive': [{'VE2': 0.7}, {'ME1': 0.8}, {'ME5': 0.6}, {'TE5': 0.4}, {'CE4': 0.4}],
        'link_negative': []
      },
      {
        'id': 'Interaction opportunities are evident',
        'name': 'IE1',
        'link_positive': [{'ME1': 0.7}, {'ME2': 0.7}, {'ME6': 0.6}, {'TE4': 0.9}, {'TE5': 0.7}, {'PE2': 0.8}],
        'link_negative': [{'CE2': -0.6}, {'CE3': -0.6}, {'ME6': -0.5}, {'TE5': -0.2}]
      },
      {
        'id': 'Actions are fluid, not awkward',
        'name': 'IE2',
        'link_positive': [{'SE2': 0.9}],
        'link_negative': [{'IE3': -0.8}, {'IE4': -0.8}]
      },
      {
        'id': 'Things stay where you put them',
        'name': 'IE3',
        'link_positive': [{'SE4': 0.6}, {'IE5': 0.5},{'TE1': 0.8}, {'ME2': 0.5}, {'IE4': 0.9}, {'ME5': 0.9}],
        'link_negative': [{'TE2': -0.7}, {'SE1': -0.6}, {'SE2': -0.4}, {'VE1': -0.3}, {'VE2': -0.3}, {'VE4': -0.9}]
      },
      {
        'id': 'Accidental mistakes are unlikely',
        'name': 'IE4',
        'link_positive': [{'IE5': 0.7},{'PE1': 0.8},{'PE2': 0.8}, {'TE1': 0.9}, {'TE2': 0.7}, {'TE4': 0.8}, {'VE2': 0.7}, {'VE3': 0.7}, {'SE3': 0.8}, {'ME2': 0.8}, {'ME3': 0.7}, {'ME4': 0.8}],
        'link_negative': [{'SE2': -0.9}, {'ME5': -0.6}, {'IE2': -0.8},  {'PE3': -0.7}, {'PE4': -0.7}, {'CE2': -0.8}, {'CE3': -0.8}, {'CE4': -0.7}]
      },
      {
        'id': 'Easier actions steer what you do',
        'name': 'IE5',
        'link_positive': [{'SA3': 0.5},{'SA1': 0.5},{'IE1': 0.8},{'IE2': 0.9}, {'SE3': 0.8}, {'VE3': 0.7}, {'PE1': 0.7}],
        'link_negative': [{'CE2': -0.7}, {'SE2': -0.8}, {'ME5': -0.8}, {'TE3': -0.9}]
      },
      {
        'id': 'It is easy to refer to specific parts',
        'name': 'IE6',
        'link_positive': [{'SA2': 0.8},{'SE4': 0.7}, {'TE1': 0.7},{'ME1': 0.7}, {'ME4': 0.7}, {'IE3': 0.8}, {'ME5': 0.6}],
        'link_negative': [ {'VE4': -0.7}, {'PE5': -0.4}]
      },
      {
        'id': 'You don’t need to think too hard',
        'name': 'TE1',
        'link_positive': [{'VE1': 0.8}, {'VE4': 0.8}, {'SE1': 0.7}, {'SE3': 0.7}, {'SE4': 0.7}, {'PE1': 0.8}, {'PE2': 0.8}, {'VE3': 0.7}, {'ME1': 0.7}, {'ME2': 0.7}, {'IE6': 0.8}, {'VE5': 0.7}, {'ME5': 0.7}],
        'link_negative': [{'TE3': -0.9}]
      },
      {
        'id': 'You can read-off new information',
        'name': 'TE2',
        'link_positive': [{'VE3': 0.8}, {'VE5': 0.8}, {'SE1': 0.7}, {'SE3': 0.7}, {'IE5': 0.7}],
        'link_negative': [{'ME1': -0.6}, {'ME6': -0.6}, {'CE3': -0.8}]
      },
      {
        'id': 'It makes you stop and think',
        'name': 'TE3',
        'link_positive': [{'SE1': 0.7}, {'ME2': 0.7}, {'TE2': 0.7}],
        'link_negative': [{'TE1': -0.9}, {'TE5': -0.8},{'IE2': -0.9}]
      },
      {
        'id': 'Elements mean only one thing',
        'name': 'TE4',
        'link_positive': [{'ME1': 0.8}, {'PE2': 0.8}],
        'link_negative': [{'CE1': -0.7}, {'CE2': -0.7}, {'CE3': -0.7}]
      },
      {
        'id': 'You are drawn in to play around',
        'name': 'TE5',
        'link_positive': [{'IE2': 0.8}, {'IE4': 0.8}, {'PE3': 0.7}, {'PE4': 0.7}, {'SE2': 0.7}, {'IE3': 0.7}, {'CE3': 0.4}, {'CE4': 0.6}],
        'link_negative': []
      },
      {
        'id': 'The order of tasks is natural',
        'name': 'PE1',
        'link_positive': [{'IE2': 0.7}, {'IE5': 0.7}, {'TE5': 0.4}, {'SE4': 0.6}, {'CE1': 0.3}],
        'link_negative': []
      },
      {
        'id': 'The steps you take match your goals',
        'name': 'PE2',
        'link_positive': [{'ME5': 0.5}, {'TE4': 0.8}, {'ME2': 0.9}, {'VE5': 0.7}],
        'link_negative': [ {'CE2': -0.7}]
      },
      {
        'id': 'You can try out a partial product',
        'name': 'PE3',
        'link_positive': [{'IE2': 0.7}, {'TE5': 0.7}, {'PE4': 0.7}, {'ME5': 0.4}],
        'link_negative': []
      },
      {
        'id': 'You can be non-committal',
        'name': 'PE4',
        'link_positive': [{'ME5': 0.6}],
        'link_negative': [{'PE6': -0.7}]
      },
      {
        'id': 'Repetition can be automated',
        'name': 'PE5',
        'link_positive': [{'CE1': 0.9}],
        'link_negative': [{'PE2': -0.8}, {'SE2': -0.7}, {'SE1': -0.6}, {'IE4': -0.6}]
      },
      {
        'id': 'The content can be preserved',
        'name': 'PE6',
        'link_positive': [{'SE4': 0.6}, {'ME5': 0.7}],
        'link_negative': [{'VE3': -0.6}, {'SE3': -0.6},{'ME4': -0.6}, {'PE4': -0.7}, {'SE2': -0.6}]
      },
      {
        'id': 'You can extend the language',
        'name': 'CE1',
        'link_positive': [{'VE4': 0.7}, {'PE5': 0.8}, {'ME2': 0.7}, {'PE2': 0.7}, {'TE5': 0.4}, {'SE2': 0.6}],
        'link_negative': [{'TE1': -0.8}, {'SE1': -0.7}, {'ME2': -0.7}, {'TE4': -0.7}, {'PE1': -0.6}]
      },
      {
        'id': 'You can redefine how it is interpreted',
        'name': 'CE2',
        'link_positive': [{'CE1': 0.9}, {'SA1': 0.7}, {'SA3': 0.7}, {'ME5': 0.7}],
        'link_negative': [{'ME1': -0.6}, {'ME2': -0.6}, {'ME6':-0.6}]
      },
      {
        'id': 'You can see different things when you look again',
        'name': 'CE3',
        'link_positive': [{'PE4': 0.7}, {'TE2': 0.7}, {'TE3': 0.7}],
        'link_negative': [{'VE2': -0.7}, {'SE1': -0.7}, {'SE3': -0.7}, {'ME2': -0.7}, {'ME3': -0.7}, {'ME4': -0.7}, {'TE4': -0.7}]
      },
      {
        'id': 'Anything not forbidden is allowed',
        'name': 'CE4',
        'link_positive': [{'TE5': 0.7}, {'PE1': 0.7}, {'PE4': 0.7}, {'ME5': 0.8}],
        'link_negative': [{'ME2': -0.7}, {'TE4': -0.7}, {'VE2': -0.6}, {'IE5': -0.6}, {'PE2': -0.6}]
      }
];

// Your data
const activities = 
  [
  {
    "id": "Search",
    "name": "IA1",
    "size": 1,
    "imports": ["VE1", "VE4", "SE3", "TE4"]
  },
  {
    "id": "Comparison",
    "name": "IA2",
    "size": 1,
    "imports": ["VE5", "SE4", "ME4", "TE2"]
  },
  {
    "id": "Sense-making",
    "name": "IA3",
    "size": 1,
    "imports": ["VE2", "VE3", "SE1", "ME1", "ME3", "TE3", "TE5"]
  },
  {
    "id": "Incrementation",
    "name": "CA1",
    "size": 1,
    "imports": ["IE1", "PE6"]
  },
  {
    "id": "Transcription",
    "name": "CA2",
    "size": 1,
    "imports": ["ME2", "IE2", "IE3", "IE5", "PE2", "PE5"]
  },
  {
    "id": "Modification",
    "name": "CA3",
    "size": 1,
    "imports": ["SE2", "ME5", "IE4", "TE1", "PE1", "CE1"]
  },
  {
    "id": "Exploratory design",
    "name": "CA4",
    "size": 1,
    "imports": ["TE5", "PE3", "PE4", "CE2", "CE3", "CE4"]
  },
  {
    "id": "Illustrate a story",
    "name": "SA1",
    "size": 1,
    "imports": ["VE2", "VE4", "IE6", "TE1", "CE3"]
  },
  {
    "id": "Organise a discussion",
    "name": "SA2",
    "size": 1,
    "imports": ["ME5", "IE2", "TE2", "PE3", "PE4", "CE4"]
  },
  {
    "id": "Persuade an audience",
    "name": "SA3",
    "size": 1,
    "imports": ["VE3", "SE4", "ME2", "ME6", "IE5", "TE3", "TE5"]
  }

];


const activities_dict = 
  {
    "IA1":{
    "id": "Search",
    "name": "IA1",
    "size": 1,
    "imports": ["VE1", "VE4", "SE3", "TE4"]
  },
  "IA2": {
    "id": "Comparison",
    "name": "IA2",
    "size": 1,
    "imports": ["VE5", "SE4", "ME4", "TE2"]
  },
  "IA3": {
    "id": "Sense-making",
    "name": "IA3",
    "size": 1,
    "imports": ["VE2", "VE3", "SE1", "ME1", "ME3", "TE3", "TE5"]
  },
  "CA1":{
    "id": "Incrementation",
    "name": "CA1",
    "size": 1,
    "imports": ["IE1", "PE6"]
  },
  "CA2": {
    "id": "Transcription",
    "name": "CA2",
    "size": 1,
    "imports": ["ME2", "IE2", "IE3", "IE5", "PE2", "PE5"]
  },
  "CA3": {
    "id": "Modification",
    "name": "CA3",
    "size": 1,
    "imports": ["SE2", "ME5", "IE4", "TE1", "PE1", "CE1"]
  },
 "CA4":{
    "id": "Exploratory design",
    "name": "CA4",
    "size": 1,
    "imports": ["TE5", "PE3", "PE4", "CE2", "CE3", "CE4"]
  },
  "SA1":{
    "id": "Illustrate a story",
    "name": "SA1",
    "size": 1,
    "imports": ["VE2", "VE4", "IE6", "TE1", "CE3"]
  },
  "SA2": {
    "id": "Organise a discussion",
    "name": "SA2",
    "size": 1,
    "imports": ["ME5", "IE2", "TE2", "PE3", "PE4", "CE4"]
  },
 "SA3":{
    "id": "Persuade an audience",
    "name": "SA3",
    "size": 1,
    "imports": ["VE3", "SE4", "ME2", "ME6", "IE5", "TE3", "TE5"]
  }

  };

const secondaryData=[
    {'name': 'IE1','in': ['PE1', 'IE2', 'PE3', 'IE3'],'out': ['CE4', 'ME1']},
    {'name': 'IE2', 'in': ['ME2', 'PE6'], 'out': ['PE2', 'SE2']},
    {'name': 'IE3','in': ['PE5', 'VE5', 'SE1', 'ME2', 'ME6'], 'out': ['CE4', 'CE3']},
    {'name': 'VE2','in': ['IE5', 'CE3'],'out': ['IE2', 'VE5', 'TE4', 'ME6', 'SE1']},
    {'name': 'VE4', 'in': ['IE6'], 'out': ['SE1']},
    {'name': 'VE5', 'in': ['SE3', 'SE2', 'ME4'], 'out': ['ME3', 'IE2', 'CE4']},
    {'name': 'PE3','in': ['CE3', 'VE2', 'PE2', 'ME5', 'TE1'], 'out': ['TE5', 'PE4']},
    {'name': 'PE6','in': ['ME3', 'PE5'],'out': ['CE1', 'SE2', 'PE1', 'ME5', 'IE6', 'IE1']},
    {'name': 'SE1', 'in': ['TE2'], 'out': ['ME2']},
    {'name': 'SE3','in': ['ME4', 'PE1', 'ME6'],'out': ['IE5', 'PE6', 'CE2', 'IE2', 'SE1', 'VE3']},
    {'name': 'ME2','in': ['IE5', 'IE4', 'IE3', 'SE1', 'VE2'],'out': ['TE4', 'IE6']},
    {'name': 'ME4', 'in': ['ME6', 'PE2', 'TE5', 'ME1', 'TE2'], 'out': ['SE4']},
    {'name': 'CE1','in': ['PE3', 'TE3', 'VE3', 'VE1', 'IE2', 'TE4'],'out': ['ME3']},
    {'name': 'TE2', 'in': ['ME4'], 'out': ['ME6', 'CE4']},

];