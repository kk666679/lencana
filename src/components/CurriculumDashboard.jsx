import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { curriculumBadges, subjects, educationLevels } from '../data/curriculum-badges';

export default function CurriculumDashboard() {
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [selectedBadge, setSelectedBadge] = useState(null);

  const filteredBadges = curriculumBadges.filter(badge => {
    const subjectMatch = selectedSubject === 'All' || 
      badge.curriculum.subjects.includes(selectedSubject);
    const levelMatch = selectedLevel === 'All' || 
      badge.curriculum.levels.some(level => selectedLevel.includes(level.split(' ')[1]));
    return subjectMatch && levelMatch;
  });

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 text-center">
          Cross-Curricular 3D Badges LMS Platform
        </h1>
        <p className="text-lg text-gray-600 text-center max-w-4xl mx-auto">
          Inspiring National Identity and Holistic Education through Malaysian National Honours
        </p>
      </div>

      {/* Curriculum Alignment Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-blue-700">KSSR Aligned</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-800">
              {curriculumBadges.filter(b => b.curriculum.kssr_alignment).length}
            </div>
            <div className="text-xs text-blue-600">Primary Curriculum</div>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-green-700">KSSM Aligned</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800">
              {curriculumBadges.filter(b => b.curriculum.kssm_alignment).length}
            </div>
            <div className="text-xs text-green-600">Secondary Curriculum</div>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 border-purple-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-purple-700">Subjects Covered</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-800">
              {new Set(curriculumBadges.flatMap(b => b.curriculum.subjects)).size}
            </div>
            <div className="text-xs text-purple-600">Cross-Curricular</div>
          </CardContent>
        </Card>

        <Card className="bg-orange-50 border-orange-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-orange-700">Learning Outcomes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-800">
              {curriculumBadges.reduce((sum, b) => sum + b.learning_outcomes.length, 0)}
            </div>
            <div className="text-xs text-orange-600">Holistic Development</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-4">
        <select 
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="All">All Subjects</option>
          {subjects.map(subject => (
            <option key={subject} value={subject}>{subject}</option>
          ))}
        </select>

        <select 
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="All">All Levels</option>
          {educationLevels.slice(1).map(level => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
      </div>

      {/* Badge Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredBadges.map(badge => (
          <Card key={badge.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{badge.name}</CardTitle>
                <Badge className={`${badge.rarity === 'Legendary' ? 'bg-yellow-500' : 
                  badge.rarity === 'Epic' ? 'bg-purple-500' : 'bg-blue-500'} text-white`}>
                  {badge.rarity}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">{badge.description}</p>
              
              <div>
                <h4 className="font-semibold text-sm mb-2">Curriculum Alignment:</h4>
                <div className="text-xs space-y-1">
                  <div><strong>KSSR:</strong> {badge.curriculum.kssr_alignment}</div>
                  <div><strong>KSSM:</strong> {badge.curriculum.kssm_alignment}</div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-sm mb-2">Subjects ({badge.curriculum.subjects.length}):</h4>
                <div className="flex flex-wrap gap-1">
                  {badge.curriculum.subjects.slice(0, 3).map(subject => (
                    <Badge key={subject} variant="outline" className="text-xs">
                      {subject}
                    </Badge>
                  ))}
                  {badge.curriculum.subjects.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{badge.curriculum.subjects.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-sm mb-2">Learning Outcomes:</h4>
                <ul className="text-xs space-y-1">
                  {badge.learning_outcomes.slice(0, 2).map((outcome, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1 h-1 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>{outcome}</span>
                    </li>
                  ))}
                  {badge.learning_outcomes.length > 2 && (
                    <li className="text-gray-500">+{badge.learning_outcomes.length - 2} more outcomes</li>
                  )}
                </ul>
              </div>

              <Button 
                onClick={() => setSelectedBadge(badge)}
                className="w-full"
              >
                View Cross-Curricular Activities
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Badge Detail Modal */}
      {selectedBadge && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold">{selectedBadge.name}</h2>
              <Button variant="outline" onClick={() => setSelectedBadge(null)}>
                ✕
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Cross-Curricular Activities:</h3>
                <div className="space-y-3">
                  {selectedBadge.cross_curricular_activities.map((activity, idx) => (
                    <div key={idx} className="border rounded-lg p-3">
                      <div className="font-medium text-blue-700">{activity.subject}</div>
                      <div className="text-sm text-gray-600 mt-1">{activity.activity}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Learning Outcomes:</h3>
                <ul className="space-y-2">
                  {selectedBadge.learning_outcomes.map((outcome, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></span>
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
                
                <h3 className="font-semibold mb-2 mt-4">Assessment Criteria:</h3>
                <ul className="space-y-2">
                  {selectedBadge.criteria.map((criterion, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <span className="w-2 h-2 bg-orange-500 rounded-full mt-1.5 flex-shrink-0"></span>
                      <span>{criterion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}